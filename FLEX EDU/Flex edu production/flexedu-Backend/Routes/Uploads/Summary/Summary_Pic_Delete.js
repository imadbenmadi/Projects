const fs = require("fs");
const Summary = require("../../../Models/Summary");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Summaries_Pictures/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const Delete_summary_Image = async (req, res) => {
    try {
        const summaryId = req.params.summaryId;
        const summary = await Summary.findOne({
            where: { id: summaryId },
        });
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
                return res.status(400).send({
                    message:
                        "Could not delete summary picture : " + error.message,
                });
            }
        } else {
            return res.status(200).send({
                message: "summary Picture Not Found",
            });
        }
        await Summary.update({ Image: null }, { where: { id: summaryId } });
        // Example response
        return res.status(200).send({
            message: "summary picture deleted successfully!",
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
module.exports = [uploadMiddleware, Delete_summary_Image];
