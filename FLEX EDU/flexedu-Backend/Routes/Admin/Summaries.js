const express = require("express");
const router = express.Router();
const Summary = require("../../Models/Summary");
const fs = require("fs");
const path = require("path");
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");
const Admin_Middleware = require("../../Middlewares/Admin");
const Students = require("../../Models/Student");
const {
    Student_Notifications,
    Teacher_Notifications,
} = require("../../Models/Notifications");
const Review_Summary = require("../../Models/Review_Summary");
router.get("/", Admin_Middleware, async (req, res) => {
    try {
        const summarys = await Summary.findAll({
            order: [["createdAt", "DESC"]],
        });
        // if (!summarys)
        //     return res.status(404).json({ error: "No summarys found." });
        return res.status(200).json({ Summary: summarys });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.get("/:summaryId", Admin_Middleware, async (req, res) => {
    const summaryId = req.params.summaryId;
    if (!summaryId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or summaryId" });
    try {
        const summary = await Summary.findOne({
            where: {
                id: summaryId,
            },
            include: [
                {
                    model: Review_Summary,
                    // as: "Course_Video",
                },
            ],

            order: [["createdAt", "DESC"]],
        });
        if (!summary)
            return res.status(404).json({ error: "summary not found." });
        return res.status(200).json({ Summary: summary });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

router.put("/:summaryId", Admin_Middleware, async (req, res) => {
    const summaryId = req.params.summaryId;
    const { Title, Description, Price, Category } = req.body;
    if (!summaryId || !Title || !Description || !Category)
        return res.status(409).json({
            error: "Unauthorized , missing summaryId or Title or Description or Price or Category",
        });
    try {
        const summary = await Summary.findOne({
            where: {
                id: summaryId,
            },
        });
        if (!summary)
            return res.status(404).json({ error: "summary not found." });
        summary.Title = Title;
        summary.Description = Description;
        summary.Price = Price;
        summary.Category = Category;
        await summary.save();
        return res.status(200).json({ message: "summary updated." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.delete("/:summaryId", Admin_Middleware, async (req, res) => {
    const summaryId = req.params.summaryId;
    if (!summaryId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or summaryId" });
    try {
        const summary = await Summary.findOne({
            where: {
                id: summaryId,
            },
        });
        if (!summary)
            return res.status(404).json({ error: "summary not found." });
        const summaryPurcaseRequests = await Summary_Purcase_Requests.findAll({
            where: {
                SummaryId: summaryId,
            },
        });
        if (summaryPurcaseRequests.length > 0) {
            // return res.status(409).json({
            //     error: "Summary has purcase requests, cannot delete.",
            // });
            let counter = 0;
            await Promise.all(
                summaryPurcaseRequests.map(async (request) => {
                    const students = await Students.findOne({
                        where: {
                            id: request.StudentId,
                        },
                    });
                    if (students) {
                        await Student_Notifications.create({
                            StudentId: request.StudentId,
                            title: "Summary deleted",
                            text: `The summary ${summary.Title} has been deleted by the Admin.
                             Your request has been cancelled , please Contact the Support for Any issue.`,
                            link: "/Student/Purchased",
                        });
                        counter++;
                    }
                })
            );
            if (counter > 0) {
                await Teacher_Notifications.create({
                    TeacherId: summary.TeacherId,
                    title: "Summary deleted",
                    text: `The summary ${summary.Title} has been deleted bu the Admin. 
                     ${counter} requests have been cancelled. please Contact the Support for Any issue.`,
                    link: "/Teacher/Payments",
                });
            }
            await Summary_Purcase_Requests.destroy({
                where: {
                    SummaryId: summaryId,
                },
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
        if (summary.file_link) {
            const previousResumeFilename = summary.file_link.split("/").pop();
            const previousResumePath = path.join(
                "public/Summaries",
                previousResumeFilename
            );
            if (fs.existsSync(previousResumePath)) {
                try {
                    fs.unlinkSync(previousResumePath);
                } catch (error) {
                    return res.status(400).send({
                        message:
                            "Could not delete resume file: " + error.message,
                    });
                }
            }
        }
        await Review_Summary.destroy({
            where: {
                SummaryId: summaryId,
            },
        });
        await summary.destroy();

        return res.status(200).json({ message: "summary deleted." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
// router.delete(
//     "/:summaryId",
//     Admin_Middleware,
//     TeacherController.DeleteCourse
// );
module.exports = router;
