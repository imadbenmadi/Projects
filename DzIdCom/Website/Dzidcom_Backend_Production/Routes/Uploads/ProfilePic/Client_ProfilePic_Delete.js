const fs = require("fs");
const path = require("path");
const { Clients } = require("../../../Models/Client");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/ProfilePics/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const uploadClientProfilePic = async (req, res) => {
    try {
        const userId = req.decoded.userId;
        const client = await Clients.findOne({ where: { id: userId } });
        if (!client) {
            return res.status(404).send({
                message: "Client not found for the given userId",
            });
        }
        if (client.profile_pic_link) {
            const previousFilename = client.profile_pic_link.split("/").pop();
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
        await Clients.update(
            { profile_pic_link: null },
            { where: { id: userId } }
        );
        // Example response
        return res.status(200).send({
            message: "Client profile picture deleted successfully!",
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
module.exports = [uploadMiddleware, uploadClientProfilePic];
