const fs = require("fs");
const path = require("path");
const { PortfolioItems } = require("../../../Models/Freelnacer");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Portfolio/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Delete handler
const Delete_Freelancer_PortfolioItem = async (req, res) => {
    try {
        const userId = req.decoded.userId;
        const itemsId = req.body.itemId;

        if (!userId || !itemsId) {
            return res.status(400).send({
                message: "User ID and items ID are required",
            });
        }
        const items = await PortfolioItems.findOne({
            where: { id: itemsId },
        });

        if (!items) {
            return res.status(404).send({
                message: "items not found for the given userId",
            });
        }

        if (items.image_Link) {
            const previousFilename = path.basename(items.image_Link);
            const previousImagePath = path.join(
                "public/Portfolio/",
                previousFilename
            );

            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                console.error("Error deleting previous image:", error);
                return res.status(400).send({
                    message:
                        "Could not delete profile item image: " + error.message,
                });
            }

            await PortfolioItems.update(
                { image_Link: null },
                { where: { id: itemsId } }
            );

            return res.status(200).send({
                message: "profile item image deleted successfully!",
            });
        } else {
            return res.status(200).send({
                message: "profile item image not found",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            message: "Error processing the request",
            error: error.message,
        });
    }
};

// Export the middleware and delete handler
module.exports = [uploadMiddleware, Delete_Freelancer_PortfolioItem];
