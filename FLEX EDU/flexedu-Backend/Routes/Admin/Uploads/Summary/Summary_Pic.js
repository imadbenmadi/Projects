const fs = require("fs");
const path = require("path");
const Summary = require("../../../../Models/Summary");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Summaries_Pictures/ ",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const Upload_summary_Image = async (req, res) => {
    try {
        const summaryId = req.params.summaryId; // Assuming summaryId is passed in the route
        if (!summaryId) {
            return res.status(400).send({
                message: "summary ID is required",
            });
        }
        const { summaryPic } = req.files;
        if (!summaryPic) {
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
        if (!allowedTypes.includes(summaryPic.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(summaryPic.name).toLocaleLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        const uniqueSuffix = `summary-${userId}-${Date.now()}${fileExtension}`;

        const fileLink = `/Summaries_Pictures/${uniqueSuffix}`;
        const summary = await Summary.findOne({ where: { id: summaryId } });
        if (!summary) {
            return res.status(404).send({
                message: "summary not found for the given userId",
            });
        }
        if (summary.Image) {
            const previousFilename = summary.Image.split("/").pop();
            const previousImagePath = `public/Summaries_Pictures/${previousFilename}`;
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
        //     summaryPic.path,
        //     path.join("public/Summaries_Pictures/", uniqueSuffix)
        // );

        // Copy the file to the desired location and delete the original
        const targetPath = path.join(
            "public/Summaries_Pictures/",
            uniqueSuffix
        );
        fs.copyFileSync(summaryPic.path, targetPath);
        fs.unlinkSync(summaryPic.path);

        // Update database with file link
        await Summary.update({ Image: fileLink }, { where: { id: summaryId } });

        // Example response
        res.status(200).send({
            message: "summary picture uploaded successfully!",
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
module.exports = [uploadMiddleware, Upload_summary_Image];
