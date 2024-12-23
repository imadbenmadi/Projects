const fs = require("fs");
const path = require("path");
const Course_Purcase_Requests = require("../../../Models/Course_Purcase_Requests");
const Courses = require("../../../Models/Course");
const formidableMiddleware = require("express-formidable");
const Course_Progress = require("../../../Models/Course_Progress");
const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Payment/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const Upload_Course_Payment = async (req, res) => {
    console.log("Upload_Course_Payment");
    
    try {
        const userId = req.decoded.userId;
        const courseId = req.params.courseId;
        if (!userId || !courseId) {
            return res.status(400).send({
                message: "Messing data ",
            });
        }
        const course = await Courses.findOne({
            where: { id: courseId },
        });
        if (!course) {
            return res.status(404).send({
                message: "course not found for the given userId",
            });
        }
        if (!course.Price || course.Price == 0 || course.Price == null) {
            console.log("free course");
            
            await Course_Purcase_Requests.create({
                screenShot: null,
                status: "accepted",
                CourseId: courseId,
                StudentId: userId,
                TeacherId: course.TeacherId,
                Price: 0,
                CCP_number: null,
            });
            await course.increment("Students_count", { by: 1 });
            await Course_Progress.create({
                StudentId: userId,
                CourseId: courseId,
                // Course_Videos_number: course.Vedios_count,
            });

            return res.status(200).send({ message: "Enrolled successfully" });
        }
        const { CCP_number } = req.body;
        if (!CCP_number) {
            return res.status(400).send({
                message: "CCP_number is required",
            });
        }
        const { image } = req.files;
        if (!image) {
            return res.status(400).send({
                message: "No file uploaded",
            });
        }
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/heic",
        ];
        if (!allowedTypes.includes(image.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(image.name).toLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        const uniqueSuffix = `Course_Payment-${userId}-${courseId}-${Date.now()}${fileExtension}`;

        const fileLink = `/Payment/${uniqueSuffix}`;

        const purcase = await Course_Purcase_Requests.findOne({
            where: {
                CourseId: courseId,
                StudentId: userId,
            },
        });
        if (purcase && purcase.status == "pending") {
            return res.status(409).send({
                message: "Unauthorized: pending request",
            });
        }
        if (purcase && purcase.screenShot && purcase.status == "rejected") {
            const previousFilename = purcase.screenShot.split("/").pop();
            const previousImagePath = `public/Payment/${previousFilename}`;
            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
                const targetPath = path.join("public/Payment/", uniqueSuffix);
                fs.copyFileSync(image.path, targetPath);
                fs.unlinkSync(image.path);
                // Update database with file link
                await purcase.update({
                    screenShot: fileLink,
                    status: "pending",
                    CourseId: courseId,
                    StudentId: userId,
                    TeacherId: course.TeacherId,
                    Price: course.Price,
                    CCP_number: CCP_number,
                });

                return res.status(200).send({
                    message: "Payment ScreenShot uploaded successfully!",
                    fileLink,
                });
            } catch (error) {
                console.error("Error deleting previous image:", error);
            }
        } else {
            // Move the file to the desired location
            // fs.renameSync(image.path, path.join("public/Payment/", uniqueSuffix));
            const targetPath = path.join("public/Payment/", uniqueSuffix);
            fs.copyFileSync(image.path, targetPath);
            fs.unlinkSync(image.path);
            // Update database with file link
            await Course_Purcase_Requests.create({
                screenShot: fileLink,
                status: "pending",
                CourseId: courseId,
                StudentId: userId,
                TeacherId: course.TeacherId,
                Price: course.Price,
                CCP_number: CCP_number,
            });

            // Example response
            res.status(200).send({
                message: "Payment ScreenShot uploaded successfully!",
                fileLink,
            });
        }
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
module.exports = [uploadMiddleware, Upload_Course_Payment];
