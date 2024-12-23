const fs = require("fs");
const path = require("path");
const Summary_Purcase_Requests = require("../../../../Models/Summary_Purcase_Requests");
const Summary = require("../../../../Models/Summary");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Payment/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const Upload_summary_Payment = async (req, res) => {
    try {
        const { image } = req.files;
        if (!image) {
            return res.status(400).send({
                message: "No file uploaded",
            });
        }
        const userId = req.decoded.userId;
        const { CCP_number } = req.body;
        const summaryId = req.params.summaryId;
        if (!userId || !summaryId || !CCP_number) {
            return res.status(400).send({
                message: "Messing data ",
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
        const uniqueSuffix = `summary_Payment-${userId}-${summaryId}-${Date.now()}${fileExtension}`;

        const fileLink = `/Payment/${uniqueSuffix}`;
        const summary = await Summary.findOne({
            where: { id: summaryId },
        });
        if (!summary) {
            return res.status(404).send({
                message: "summary not found for the given userId",
            });
        }
        const purcase = await Summary_Purcase_Requests.findOne({
            where: {
                id: summaryId,
                StudentId: userId,
            },
        });
        if (purcase && purcase.status == "pending") {
            return res.status(409).send({
                message: "Unauthorized: pending request",
            });
        }
        if (purcase.screenShot && purcase.status == "rejected") {
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
            await Summary_Purcase_Requests.create({
                screenShot: fileLink,
                status: "pending",
                StudentId: userId,
                SummaryId: summaryId,
                CCP_number: CCP_number,
                Price: summary.Price,
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
module.exports = [uploadMiddleware, Upload_summary_Payment];
