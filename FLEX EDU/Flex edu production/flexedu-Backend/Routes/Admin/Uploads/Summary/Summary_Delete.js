const fs = require("fs");
const path = require("path");
const Summary = require("../../../../Models/Summary");

const Delete_Summary = async (req, res) => {
    try {
        const userId = req.decoded.userId;
        const resumeId = req.params.resumeId;

        // Find the resume to delete
        const teacherResume = await Summary.findOne({
            where: { id: resumeId, TeacherId: userId },
        });
        if (!teacherResume) {
            return res.status(404).send({
                message:
                    "Resume not found for the given teacherId and resumeId",
            });
        }

        // Extract the resume file path
        const previousResumeFilename = teacherResume.file_link.split("/").pop();
        const previousResumePath = path.join(
            "public/Summaries",
            previousResumeFilename
        );

        // Delete the resume file if it exists
        if (fs.existsSync(previousResumePath)) {
            try {
                fs.unlinkSync(previousResumePath);
            } catch (error) {
                return res.status(400).send({
                    message: "Could not delete resume file: " + error.message,
                });
            }
        }
        if (teacherResume.Image) {
            const previousFilename = teacherResume.Image.split("/").pop();
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
        // Remove the resume entry from the Summary table
        await Summary.destroy({ where: { id: resumeId } });

        // Send success response
        return res.status(200).send({
            message: "Resume deleted successfully!",
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            message: "Error deleting the resume",
            error: error.message,
        });
    }
};

module.exports = Delete_Summary;
