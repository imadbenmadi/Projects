const fs = require("fs");
const path = require("path");
const Summary = require("../../../../Models/Summary");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Summaries/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // Max 10 MB for PDF
});

const Upload_Summary = async (req, res) => {
    try {
        const { Resume } = req.files;
        const userId = req.decoded.userId;
        const { Title, Price, Description, Category } = req.body; // Price defaults to 0, Description to empty string

        if (!Resume) {
            return res.status(400).send({
                message: "No file uploaded",
            });
        } else if (!Title) {
            return res.status(400).send({
                message: "Title is required",
            });
        } else if (!Category) {
            return res.status(400).send({
                message: "Category is required",
            });
        }

        if (!userId) {
            return res.status(400).send({
                message: "User ID is required",
            });
        }

        const allowedTypes = ["application/pdf"];
        if (!allowedTypes.includes(Resume.type)) {
            throw new Error("Only PDF files are allowed!");
        }

        const fileExtension = path.extname(Resume.name).toLowerCase();
        if (fileExtension !== ".pdf") {
            throw new Error("Invalid file extension, only PDF is allowed");
        }

        const uniqueSuffix = `Resume-${userId}-${Date.now()}${fileExtension}`;
        const fileLink = `/Summaries/${uniqueSuffix}`;

        // Move the PDF file to the desired location
        const targetPath = path.join("public/Summaries/", uniqueSuffix);
        fs.copyFileSync(Resume.path, targetPath);
        fs.unlinkSync(Resume.path);

        // Save the summary details in the Summary table
        await Summary.create({
            Title,
            Description: Description || "", // Default to empty string if not provided
            Price: Price || 0, // Default to 0 if not provided
            Category: Category,
            Image: fileLink, // Storing the PDF link in the Image field
            TeacherId: userId,
        });

        res.status(200).send({
            message: "Summary and resume uploaded successfully!",
            fileLink,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            message: "Error processing the uploaded file",
            error: error.message,
        });
    }
};

module.exports = [uploadMiddleware, Upload_Summary];
