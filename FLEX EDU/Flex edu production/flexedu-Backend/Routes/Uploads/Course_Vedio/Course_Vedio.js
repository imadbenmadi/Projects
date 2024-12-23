const fs = require("fs");
const path = require("path");
const Courses = require("../../../Models/Course");
const Course_Video = require("../../../Models/Course_Video");

const Upload_Course_Vedio = async (req, res) => {
    try {
        const { CourseVedio } = req.files;
        const userId = req.decoded.userId;
        const { Title, Duration } = req.body; // Assuming title and duration are passed with the request
        const courseId = req.params.courseId;
        if (!courseId) {
            return res.status(400).send({
                message: "Course ID is required",
            });
        }
        // Define max size limit (e.g., 100MB)
        // const MAX_FILE_SIZE = 2000 * 1024 * 1024; // 100MB in bytes

        if (!CourseVedio) {
            return res.status(400).send({
                message: "No file uploaded",
            });
        } else if (!Title || !Duration) {
            return res.status(400).send({
                message: "Title and Duration are required",
            });
        } else if (Title.length < 3 || Title.length > 100) {
            return res.status(400).send({
                message: "Title must be between 3 and 100 characters",
            });
        }

        if (!userId) {
            return res.status(400).send({
                message: "User ID is required",
            });
        }

        // Check the file size
        // if (CourseVedio.size > MAX_FILE_SIZE) {
        //     return res.status(400).send({
        //         message: `File size exceeds the maximum limit of ${
        //             MAX_FILE_SIZE / (1024 * 1024)
        //         } MB`,
        //     });
        // }

        const allowedTypes = ["video/mp4", "video/avi", "video/mkv"];
        if (!allowedTypes.includes(CourseVedio.type)) {
            throw new Error("Only MP4, AVI, and MKV videos are allowed!");
        }

        const fileExtension = path.extname(CourseVedio.name).toLowerCase();
        if (![".mp4", ".avi", ".mkv"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }

        const uniqueSuffix = `Course-${userId}-${
            req.params.courseId
        }-${Date.now()}${fileExtension}`;
        const fileLink = `/Courses_Videos/${uniqueSuffix}`;

        // Move the video file to the desired location
        const targetPath = path.join("public/Courses_Videos/", uniqueSuffix);
        fs.copyFileSync(CourseVedio.path, targetPath);
        fs.unlinkSync(CourseVedio.path);

        // Update the course with the video link and details in the Course_Video table
        const course = await Courses.findOne({ where: { id: courseId } });
        if (!course) {
            return res.status(404).send({
                message: "Course not found for the given userId",
            });
        }
        const new_course_in_db = await Course_Video.create({
            Title,
            Duration,
            Video: fileLink,
            CourseId: course.id,
        });
        // await Courses.update(
        //     { Vedios_count: course.Vedios_count + 1 },
        //     { where: { id: new_course_in_db.id } }
        // );
        res.status(200).send({
            message: "Video uploaded successfully!",
            fileLink,
            new_course_in_db,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            message: "Error processing the uploaded file",
            error: error.message,
        });
    }
};

module.exports = [Upload_Course_Vedio];
