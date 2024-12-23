const fs = require("fs");
const Students = require("../../../Models/Student");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/ProfilePics/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const uploadStudentProfilePic = async (req, res) => {
    try {
        const userId = req.decoded.userId;
        const Student = await Students.findOne({ where: { id: userId } });
        if (!Student) {
            return res.status(404).send({
                message: "Student not found for the given userId",
            });
        }
        if (Student.profile_pic_link) {
            const previousFilename = Student.profile_pic_link.split("/").pop();
            const previousImagePath = `public/ProfilePics/${previousFilename}`;
            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                return res.status(400).send({
                    message:
                        "Could not delete profile picture : " + error.message,
                });
            }
        } else {
            return res.status(200).send({
                message: "Profile Picture Not Found",
            });
        }
        await Students.update(
            { profile_pic_link: null },
            { where: { id: userId } }
        );
        // Example response
        return res.status(200).send({
            message: "Student profile picture deleted successfully!",
        });
    } catch (error) {
        // Error handling
        console.error("Error:", error);
        return res.status(500).send({
            message: "Error processing the uploaded file",
            error: error.message,
        });
    }
};

// Export the middleware and upload handler
module.exports = [uploadMiddleware, uploadStudentProfilePic];
