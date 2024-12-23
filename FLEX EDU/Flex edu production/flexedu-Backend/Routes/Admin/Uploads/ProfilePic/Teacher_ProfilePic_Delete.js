const fs = require("fs");
const Teachers = require("../../../../Models/Teacher");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/ProfilePics/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const uploadTeacherProfilePic = async (req, res) => {
    try {
        const userId = req.decoded.userId;
        const Teacher = await Teachers.findOne({ where: { id: userId } });
        if (!Teacher) {
            return res.status(404).send({
                message: "Teacher not found for the given userId",
            });
        }
        if (Teacher.profile_pic_link) {
            const previousFilename = Teacher.profile_pic_link.split("/").pop();
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
        await Teachers.update(
            { profile_pic_link: null },
            { where: { id: userId } }
        );
        // Example response
        return res.status(200).send({
            message: "Teacher profile picture deleted successfully!",
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
module.exports = [uploadMiddleware, uploadTeacherProfilePic];
