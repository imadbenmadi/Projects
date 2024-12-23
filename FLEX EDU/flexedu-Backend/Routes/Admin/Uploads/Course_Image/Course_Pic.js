const fs = require("fs");
const path = require("path");
const Courses = require("../../../../Models/Course");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Courses_Pictures/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const Upload_Course_Image = async (req, res) => {
    try {
        const courseId = req.params.courseId; // Assuming courseId is passed in the route
        if (!courseId) {
            return res.status(400).send({
                message: "Course ID is required",
            });
        }
        const { CoursePic } = req.files;
        if (!CoursePic) {
            return res.status(400).send({
                message: "No file uploaded",
            });
        }
        const userId = req.decoded.userId;
        if (!userId) {
            return res.status(400).send({
                message: "User ID is required",
            });
        }
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/heic",
        ];
        if (!allowedTypes.includes(CoursePic.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(CoursePic.name).toLocaleLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        const uniqueSuffix = `Course-${userId}-${Date.now()}${fileExtension}`;

        const fileLink = `/Courses_Pictures/${uniqueSuffix}`;
        const Course = await Courses.findOne({ where: { id: courseId } });
        if (!Course) {
            return res.status(404).send({
                message: "Course not found for the given userId",
            });
        }
        if (Course?.Image) {
            const previousFilename = Course?.Image.split("/").pop();
            const previousImagePath = `public/Courses_Pictures/${previousFilename}`;
            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                console.error("Error deleting previous image:", error);
            }
        }
        // Move the file to the desired location
        // fs.renameSync(
        //     CoursePic.path,
        //     path.join("public/Courses_Pictures/", uniqueSuffix)
        // );

        // Copy the file to the desired location and delete the original
        const targetPath = path.join("public/Courses_Pictures/", uniqueSuffix);
        fs.copyFileSync(CoursePic.path, targetPath);
        fs.unlinkSync(CoursePic.path);

        // Update database with file link
        await Courses.update({ Image: fileLink }, { where: { id: courseId } });

        // Example response
        res.status(200).send({
            message: "Course picture uploaded successfully!",
            fileLink,
        });
    } catch (error) {
        // Error handling
        console.error("Error:", error);
        res.status(500).send({
            message: "Error processing the uploaded file",
            error: error.message,
        });
    }
};

// Export the middleware and upload handler
module.exports = [uploadMiddleware, Upload_Course_Image];
