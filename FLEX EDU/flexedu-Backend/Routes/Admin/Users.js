const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin");
const Students = require("../../Models/Student");
const Teachers = require("../../Models/Teacher"); // Done
const fs = require("fs");
const path = require("path");
const Courses = require("../../Models/Course"); // Done
const Course_Meets = require("../../Models/Course_Meets"); // Done
const Course_Progress = require("../../Models/Course_Progress"); // Done
const Course_Video = require("../../Models/Course_Video"); // Done
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests"); // Done
const Reviews = require("../../Models/Review_Course"); // Done
const Review_Summary = require("../../Models/Review_Summary"); // Done
const Summary = require("../../Models/Summary"); // Done
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");
const sequelize = require("../../config/db_connection");

const { Op } = require("sequelize");
const { Teacher_Notifications } = require("../../Models/Notifications"); // Done
const { Student_Notifications } = require("../../Models/Notifications");
router.get("/Teachers", adminMiddleware, async (req, res) => {
    const TeacherId = req.params.id;
    if (!TeacherId)
        return res.status(409).json({ message: "Teacher ID is required" });
    try {
        const Teacher = await Teachers.findOne({
            where: { id: TeacherId },
            // attributes: { exclude: ["password"] },
        });

        res.status(200).json({ user: Teacher });
    } catch (err) {
        console.error("Error fetching Teacher:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/Students", adminMiddleware, async (req, res) => {
    try {
        const students = await Students.findAll();
        res.status(200).json({ students });
    } catch (err) {
        console.error("Error fetching Students:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/Students/:id", adminMiddleware, async (req, res) => {
    const StudentId = req.params.id;
    if (!StudentId)
        return res.status(409).json({ message: "Student ID is required" });
    try {
        const Student = await Students.findOne({
            where: { id: StudentId },
            // attributes: { exclude: ["password"] },
        });

        res.status(200).json({ user: Student });
    } catch (err) {
        console.error("Error fetching Student:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Teachers/:id", adminMiddleware, async (req, res) => {
    const TeacherId = req.params.id;
    if (!TeacherId)
        return res.status(409).json({ message: "Teacher ID is required" });
    try {
        const Teacher = await Teachers.findOne({
            where: { id: TeacherId },
            // attributes: { exclude: ["password"] },
        });

        res.status(200).json({ user: Teacher });
    } catch (err) {
        console.error("Error fetching Teacher:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/Teachers/:id", adminMiddleware, async (req, res) => {
    const TeacherId = req.params.id;
    if (!TeacherId)
        return res.status(409).json({ message: "Teacher id is required" });
    const t = await sequelize.transaction(); // Start a transaction

    try {
        const Courses_of_Teacher = await Courses.findAll(
            {
                where: { TeacherId },
            },
            { transaction: t }
        );

        for (const course of Courses_of_Teacher) {
            const courseMeet = await Course_Meets.findAll({
                where: { CourseId: course.id },
            });
            if (courseMeet.length > 0) {
                await Course_Meets.destroy(
                    {
                        where: { CourseId: course.id },
                    },
                    { transaction: t }
                );
            }

            const courseProgress = await Course_Progress.findAll(
                {
                    where: { CourseId: course.id },
                },
                { transaction: t }
            );
            if (courseProgress.length > 0) {
                for (const progress of courseProgress) {
                    const student = await Students.findOne(
                        {
                            where: { id: progress.StudentId },
                        },
                        { transaction: t }
                    );
                    if (student) {
                        await Student_Notifications.create(
                            {
                                StudentId: progress.StudentId,
                                title: "Course deleted",
                                text: `The course ${course.Title} has been deleted by the Admin. Cause: Teacher deleted.
                                Please contact the Support for more information.`,
                            },
                            { transaction: t }
                        );
                    }
                }

                await Course_Progress.destroy(
                    {
                        where: { CourseId: course.id },
                    },
                    { transaction: t }
                );
            }

            const pendingCourseRequests = await Course_Purcase_Requests.findAll(
                {
                    where: { CourseId: course.id },
                    Price: {
                        [Op.ne]: 0,
                        [Op.not]: null,
                    },
                },
                { transaction: t }
            );

            for (const request of pendingCourseRequests) {
                const student = await Students.findOne(
                    {
                        where: { id: request.StudentId },
                    },
                    { transaction: t }
                );
                if (student) {
                    await Student_Notifications.create(
                        {
                            StudentId: request.StudentId,
                            title: "Course deleted",
                            text: `The course ${course.Title} has been deleted by the Admin. Cause: Teacher deleted.
                             Your request has been cancelled, please contact Support for any issues.`,
                        },
                        { transaction: t }
                    );
                }
            }
            await Course_Purcase_Requests.destroy(
                {
                    where: { CourseId: course.id },
                },
                { transaction: t }
            );

            const courseVideos = await Course_Video.findAll(
                {
                    where: { CourseId: course.id },
                },
                { transaction: t }
            );
            for (const video of courseVideos) {
                const videoId = video.id;
                const courseVideo = await Course_Video.findOne(
                    {
                        where: { id: videoId, CourseId: course.id },
                    },
                    { transaction: t }
                );
                if (!courseVideo) {
                    continue;
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

                await Course_Video.destroy(
                    { where: { id: videoId } },
                    { transaction: t }
                );
            }

            if (course.Image) {
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
            await Reviews.destroy(
                {
                    where: { CourseId: course.id },
                },
                { transaction: t }
            );
            await course.destroy({ transaction: t });
        }

        const Summaries_of_Teacher = await Summary.findAll(
            {
                where: { TeacherId },
            },
            { transaction: t }
        );

        for (const summary of Summaries_of_Teacher) {
            const summaryId = summary.id;
            const summaryPurcaseRequests =
                await Summary_Purcase_Requests.findAll({
                    where: { SummaryId: summaryId },
                });

            for (const request of summaryPurcaseRequests) {
                const student = await Students.findOne({
                    where: { id: request.StudentId },
                });
                if (student) {
                    await Student_Notifications.create({
                        StudentId: request.StudentId,
                        title: "Summary deleted",
                        text: `The summary ${summary.Title} has been deleted by the Admin. Your request has been cancelled, please contact Support for any issues.`,
                        link: "/Student/Purchased",
                    });
                }
            }

            await Summary_Purcase_Requests.destroy({
                where: { SummaryId: summaryId },
                transaction: t,
            });

            if (summary.Image) {
                const previousFilename = summary.Image.split("/").pop();
                const previousImagePath = `public/Summaries_Pictures/${previousFilename}`;

                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            }

            if (summary.file_link) {
                const previousResumeFilename = summary.file_link
                    .split("/")
                    .pop();
                const previousResumePath = path.join(
                    "public/Summaries",
                    previousResumeFilename
                );
                if (fs.existsSync(previousResumePath)) {
                    try {
                        fs.unlinkSync(previousResumePath);
                    } catch (error) {
                        console.log("Error deleting resume file: ", error);
                    }
                }
            }
            await Review_Summary.destroy(
                {
                    where: { SummaryId: summaryId },
                },
                { transaction: t }
            );
            await summary.destroy({ transaction: t });
        }
        await Teacher_Notifications.destroy({
            where: { TeacherId },
            transaction: t,
        });
        await Teachers.destroy({ where: { id: TeacherId }, transaction: t });
        await t.commit();
        return res
            .status(200)
            .json({ message: "Teacher deleted successfully" });
    } catch (err) {
        if (t) await t.rollback();
        console.error("Error deleting Teacher:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/Students/:id", adminMiddleware, async (req, res) => {
    const StudentId = req.params.id;
    if (!StudentId)
        return res.status(409).json({ message: "Student id is required" });
    const t = await sequelize.transaction(); // Start a transaction

    try {
        await Course_Progress.destroy({ where: { StudentId }, transaction: t });

        await Summary_Purcase_Requests.destroy({
            where: { StudentId },
            transaction: t,
        });
        // Deleting Student's Course Purchase Requests
        await Course_Purcase_Requests.destroy({
            where: { StudentId },
            transaction: t,
        });

        // Deleting Student's Notifications
        await Student_Notifications.destroy({
            where: { StudentId },
            transaction: t,
        });
        await Reviews.destroy({ where: { StudentId }, transaction: t });
        await Review_Summary.destroy({ where: { StudentId }, transaction: t });
        // Finally, deleting the student
        await Students.destroy({ where: { id: StudentId }, transaction: t });

        await t.commit();
        return res
            .status(200)
            .json({ message: "Student deleted successfully" });
    } catch (err) {
        if (t) await t.rollback();
        console.error("Error deleting Student:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/", adminMiddleware, async (req, res) => {
    try {
        const students = await Students.findAll();
        const students_to_send = students.map((student) => {
            return {
                ...student.dataValues,
                userType: "student",
            };
        });
        const teachers = await Teachers.findAll();
        const teachers_to_send = teachers.map((teacher) => {
            return {
                ...teacher.dataValues,
                userType: "teacher",
            };
        });
        const users = [...students_to_send, ...teachers_to_send];

        res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
