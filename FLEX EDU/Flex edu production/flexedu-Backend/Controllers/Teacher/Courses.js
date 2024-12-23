const Courses = require("../../Models/Course");
const Course_Progress = require("../../Models/Course_Progress");
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests");
const Course_Video = require("../../Models/Course_Video");
const { Op } = require("sequelize");
const path = require("path");
const Course_Meets = require("../../Models/Course_Meets");
const fs = require("fs");
const Reviews = require("../../Models/Review_Course");
const Students = require("../../Models/Student");
const {
    Student_Notifications,
    Teacher_Notifications,
} = require("../../Models/Notifications");
const GetCourses = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const courses = await Courses.findAll({
            where: {
                TeacherId: userId,
            },
            include: [
                {
                    model: Course_Video,
                    // as: "Course_Video",
                },
                {
                    model: Course_Meets,
                    // as: "Course_Meets",
                },
                {
                    model: Reviews,
                    include: [
                        {
                            model: Students,
                            // attributes: ["id", "Name", "Image"],
                        },
                    ],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        // if (!courses)
        //     return res.status(404).json({ error: "No courses found." });
        return res.status(200).json({ Courses: courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const GetCourse = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    if (!userId || !courseId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or courseId" });
    try {
        const course = await Courses.findOne({
            where: {
                id: courseId,
                TeacherId: userId,
            },
            include: [
                {
                    model: Course_Video,
                    // as: "Course_Video",
                },
                {
                    model: Course_Meets,
                    // as: "Course_Meets",
                },
                {
                    model: Reviews,
                    include: [
                        {
                            model: Students,
                            // attributes: ["id", "Name", "Image"],
                        },
                    ],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        return res.status(200).json({ Course: course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const Get_Vedio = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    const vedioId = req.params.vedioId;
    if (!userId || !courseId || !vedioId)
        return res.status(409).json({
            error: "Unauthorized , missing userId or courseId or vedioId",
        });
    try {
        const vedio = await Course_Video.findOne({
            where: {
                id: vedioId,
                CourseId: courseId,
            },
            include: [
                {
                    model: Courses,
                },
            ],
        });
        if (!vedio) return res.status(404).json({ error: "vedio not found." });

        return res.status(200).json({ Vedio: vedio });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const DeleteCourse = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;

    if (!userId || !courseId)
        return res
            .status(401)
            .json({ error: "Unauthorized, missing userId or courseId" });

    try {
        // Fetch course once
        const course = await Courses.findOne({
            where: {
                id: courseId,
                TeacherId: userId,
            },
        });
        if (!course)
            return res.status(404).json({ error: "Course not found." });

        let courseMeet = await Course_Meets.findAll({
            where: { CourseId: courseId },
        });
        if (courseMeet.length > 0) {
            await Course_Meets.destroy({
                where: { CourseId: courseId },
            });
        }
        let progress_counter = 0;
        let pending_counter = 0;
        const courseProgress = await Course_Progress.findAll({
            where: { CourseId: courseId },
        });
        if (courseProgress.length > 0) {
            await Promise.all(
                courseProgress.map(async (progress) => {
                    const students = await Students.findOne({
                        where: { id: progress.StudentId },
                    });
                    if (students) {
                        await Student_Notifications.create({
                            StudentId: progress.StudentId,
                            title: "Course deleted",
                            text: `The course ${course.Title} has been deleted by the teacher.
                            Please contact the Support for more information.`,
                            link: "/Student/Purchased",
                        });
                        progress_counter++;
                    }
                })
            );

            await Course_Progress.destroy({
                where: { CourseId: courseId },
            });
        }
        const pendingCourseRequests = await Course_Purcase_Requests.findAll({
            where: { CourseId: courseId },
            // status: "pending",
            Price: {
                [Op.ne]: 0, // Price not equal to 0
                [Op.not]: null, // Price not null
            },
        });
        if (pendingCourseRequests.length > 0) {
            await Promise.all(
                pendingCourseRequests.map(async (request) => {
                    const students = await Students.findOne({
                        where: { id: request.StudentId },
                    });
                    if (students) {
                        await Student_Notifications.create({
                            StudentId: request.StudentId,
                            title: "Course deleted",
                            text: `The course ${course.Title} has been deleted by the Admin.
                             Your request has been cancelled , please Contact the Support for Any issue.`,
                            link: "/Student/Purchased",
                        });

                        pending_counter++;
                    }
                })
            );
        }
        if (progress_counter > 0 || pendingCourseRequests.length > 0) {
            await Teacher_Notifications.create({
                TeacherId: course.TeacherId,
                title: "course deleted",
                text: `The course ${course.Title} has been deleted by the you. 
                     ${progress_counter} Student Lost Access to the Course. 
                     ${pending_counter} requests have been cancelled.
                      Please contact the Support for more information.`,
                link: "/Teacher/Payments",
            });
        }
        const coursePurchaseRequests = await Course_Purcase_Requests.findAll({
            where: { CourseId: courseId },
        });
        if (coursePurchaseRequests.length > 0) {
            await Course_Purcase_Requests.destroy({
                where: { CourseId: courseId },
            });
        }

        // Delete videos
        const courseVideos = await Course_Video.findAll({
            where: { CourseId: courseId },
        });
        await Promise.all(
            courseVideos.map(async (video) => {
                const videoId = video.id;
                const courseVideo = await Course_Video.findOne({
                    where: { id: videoId, CourseId: course.id },
                });
                if (!courseVideo) {
                    throw new Error(
                        "Video not found for the given courseId and videoId"
                    );
                }

                const previousVideoFilename =
                    courseVideo.Video.split("/").pop();
                const previousVideoPath = path.join(
                    "public/Courses_Videos",
                    previousVideoFilename
                );

                if (fs.existsSync(previousVideoPath)) {
                    try {
                        fs.unlinkSync(previousVideoPath);
                    } catch (error) {
                        console.error("Error deleting file: ", error);
                    }
                }

                // Remove video entry from the database
                await Course_Video.destroy({ where: { id: videoId } });
            })
        );

        // Delete course image
        if (course?.Image) {
            const previousImageFilename = course.Image.split("/").pop();
            const previousImagePath = path.join(
                "public/Courses_Pictures",
                previousImageFilename
            );

            if (fs.existsSync(previousImagePath)) {
                try {
                    fs.unlinkSync(previousImagePath);
                } catch (error) {
                    console.error("Error deleting file: ", error);
                }
            }
        }

        // Delete course from the database
        await course.destroy();

        return res
            .status(200)
            .json({ message: "Course deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const add_course = async (req, res) => {
    if (req.decoded.userType !== "teacher") {
        return res
            .status(401)
            .json({ error: "Forbidden: only teachers can create courses." });
    }
    const userId = req.decoded.userId;
    const { Title, Description, Price, Category } = req.body;

    // Check if all required fields are present
    if (!userId || !Title || !Description || !Category) {
        return res.status(409).json({
            error: "Unauthorized: missing userId, Title, Description, Price, duration, or Category",
        });
    }

    try {
        // Create a new course
        const course = await Courses.create({
            Title: Title, // Match case with your model
            Description: Description, // Match case with your model
            Price: Price, // Match case with your model
            Category: Category, // Category is mandatory per your model
            TeacherId: userId, // Set the teacher (user) ID
        });

        // Send success response
        return res
            .status(200)
            .json({ message: "Course created successfully.", course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const EditCourse = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    const { Title, Description, Price, Category } = req.body;
    if (!userId || !courseId || !Title || !Description || !Category)
        return res.status(409).json({
            error: "Unauthorized , missing userId or courseId or Title or Description or Price or Category",
        });
    try {
        const course = await Courses.findOne({
            where: {
                id: courseId,
                TeacherId: userId,
            },
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        course.Title = Title;
        course.Description = Description;
        course.Price = Price;
        course.Category = Category;
        await course.save();
        return res.status(200).json({ message: "course updated." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    GetCourses,
    DeleteCourse,
    add_course,
    GetCourse,
    Get_Vedio,
    EditCourse,
};
