const fs = require("fs");
const path = require("path");
const { Projects } = require("../../../Models/Project");
const formidableMiddleware = require("express-formidable");
const {
    Freelancer_Notifications,
    Client_Notifications,
} = require("../../../Models/Notifications");
const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Work/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const Upload_Work = async (req, res) => {
    try {
        const { files } = req.files;
        if (!files) {
            return res.status(400).send({
                message: "No file uploaded",
            });
        }
        const userId = req.decoded.userId;
        const { projectId } = req.body;

        if (!userId || !projectId) {
            return res.status(400).send({
                message: "Messing data ",
            });
        }

        const fileExtension = path.extname(files.name).toLowerCase();
        const uniqueSuffix = `Work-${userId}-${projectId}-${Date.now()}${fileExtension}`;

        const fileLink = `/Work/${uniqueSuffix}`;
        const project = await Projects.findOne({
            where: { id: projectId },
        });
        if (!project) {
            return res.status(404).send({
                message: "Project not found for the given userId",
            });
        }
        if (project.FreelancerId != userId)
            return res.status(409).send({
                message: "Unauthorized: Project does not belong to the user",
            });
        else if (project.status != "Payed" || !project.FreelancerId)
            return res.status(409).send({
                message:
                    "Unauthorized: Project is not Payed or Freelancer is not assigned",
            });
        if (project.work_Link) {
            const previousFilename = project.work_Link.split("/").pop();
            const previousfilesPath = `public/Work/${previousFilename}`;
            try {
                if (fs.existsSync(previousfilesPath)) {
                    fs.unlinkSync(previousfilesPath);
                }
            } catch (error) {
                console.error("Error deleting previous files:", error);
            }
        }
        // Move the file to the desired location
        // fs.renameSync(files.path, path.join("public/Work/", uniqueSuffix));
        const targetPath = path.join("public/Work/", uniqueSuffix);
        fs.copyFileSync(files.path, targetPath);
        fs.unlinkSync(files.path);
        // Update database with file link
        await Projects.update(
            {
                work_Link: fileLink,
                isWorkUploaded: true,
                isWorkRejected: false,
            },
            { where: { id: projectId } }
        );
        await Client_Notifications.create({
            title: "Freelancer uploaded the work",
            text: "the freelancer has successfully uploaded the completed work, and it is now available for your review.",
            type: "Freelancer_uploaded_work",
            ClientId: project.ClientId,
            link: `/Client/Projects/${projectId}`,
        });
        // Example response
        res.status(200).send({
            message: "Work uploaded successfully!",
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
module.exports = [uploadMiddleware, Upload_Work];
