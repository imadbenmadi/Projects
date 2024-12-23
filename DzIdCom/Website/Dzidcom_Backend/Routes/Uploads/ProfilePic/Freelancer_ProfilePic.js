const fs = require("fs");
const path = require("path");
const { Freelancers } = require("../../../Models/Freelnacer");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/ProfilePics/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const uploadFreelancerProfilePic = async (req, res) => {
    try {
        const { ProfilePic } = req.files;
        if (!ProfilePic) {
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
        if (!allowedTypes.includes(ProfilePic.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(ProfilePic.name).toLocaleLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        const uniqueSuffix = `Freelancer-${userId}-${Date.now()}${fileExtension}`;

        const fileLink = `/ProfilePics/${uniqueSuffix}`;
        const Freelancer = await Freelancers.findOne({ where: { id: userId } });
        if (!Freelancer) {
            return res.status(404).send({
                message: "Freelancer not found for the given userId",
            });
        }
        if (Freelancer.profile_pic_link) {
            const previousFilename = Freelancer.profile_pic_link
                .split("/")
                .pop();
            const previousImagePath = `public/ProfilePics/${previousFilename}`;
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
        //     ProfilePic.path,
        //     path.join("public/ProfilePics/", uniqueSuffix)
        // );
        const targetPath = path.join("public/ProfilePics/", uniqueSuffix);
        fs.copyFileSync(ProfilePic.path, targetPath);
        fs.unlinkSync(ProfilePic.path);
        // Update database with file link
        await Freelancers.update(
            { profile_pic_link: fileLink },
            { where: { id: userId } }
        );

        // Example response
        res.status(200).send({
            message: "Freelancer profile picture uploaded successfully!",
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
module.exports = [uploadMiddleware, uploadFreelancerProfilePic];
