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

// Upload handler
const Upload_Freelancer_PortfolioItem = async (req, res) => {
    try {
        const { image } = req.files;
        if (!image) {
            return res.status(400).send({
                message: "No file uploaded",
            });
        }
        const userId = req.decoded.userId;

        const { itemId } = req.body;
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
        if (!allowedTypes.includes(image.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(image.name).toLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        const uniqueSuffix = `Portfolio-${userId}-${itemId}-${Date.now()}${fileExtension}`;

        const fileLink = `/Portfolio/${uniqueSuffix}`;
        const portfolio_item = await PortfolioItems.findOne({
            where: { id: itemId },
        });
        if (!portfolio_item) {
            return res.status(404).send({
                message: "portfolio_item not found for the given userId",
            });
        }
        if (portfolio_item.image_Link) {
            const previousFilename = portfolio_item.image_Link.split("/").pop();
            const previousImagePath = `public/Portfolio/${previousFilename}`;
            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                console.error("Error deleting previous image:", error);
            }
        }
        // Move the file to the desired location
        // fs.renameSync(image.path, path.join("public/Portfolio/", uniqueSuffix));
        
        const targetPath = path.join("public/Portfolio/", uniqueSuffix);
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);

        // Update database with file link
        await PortfolioItems.update(
            { image_Link: fileLink },
            { where: { id: itemId } }
        );

        // Example response
        res.status(200).send({
            message: "Portfolio item picture uploaded successfully!",
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
module.exports = [uploadMiddleware, Upload_Freelancer_PortfolioItem];
