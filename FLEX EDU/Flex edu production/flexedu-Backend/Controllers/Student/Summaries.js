const Summary = require("../../Models/Summary");
const Students = require("../../Models/Student");
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");
const Review_Summary = require("../../Models/Review_Summary");
const { Op } = require("sequelize");
const Get_Summaries = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const summarys = await Summary.findAll({
            order: [["createdAt", "DESC"]],
        });
        // if (!summarys)
        //     return res.status(404).json({ error: "No summarys found." });
        return res.status(200).json({ Summaries: summarys });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const GetSummary = async (req, res) => {
    const userId = req.decoded.userId;
    const summaryId = req.params.summaryId;
    if (!userId || !summaryId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or summaryId" });
    try {
        const summary = await Summary.findOne({
            where: {
                id: summaryId,
                // TeacherId: userId,
            },

            order: [["createdAt", "DESC"]],
        });
        if (!summary)
            return res.status(404).json({ error: "summary not found." });
        let paymentStatus = null;
        const student = await Students.findOne({
            where: {
                id: userId,
            },
        });
        const purcase = await Summary_Purcase_Requests.findOne({
            where: {
                id: summaryId,
                StudentId: userId,
            },
        });
        if (purcase) {
            paymentStatus = purcase.status;
        }

        if (!student)
            return res
                .status(409)
                .json({ error: "Unauthorized , not a student" });
        let isReviewed = false;
        const reviews = await Review_Summary.findAll({
            where: {
                StudentId: userId,
                SummaryId: summaryId,
            },
        });
        if (reviews) {
            isReviewed = true;
        }
        const all_reviews = await Review_Summary.findAll({
            where: {
                SummaryId: summaryId,
            },
            include: [
                {
                    model: Students,
                    attributes: ["id", "FirstName", "LastName"],
                },
            ],
        });
        return res.status(200).json({
            paymentStatus,
            purcase,
            Summary: summary,
            isReviewed,
            all_reviews: all_reviews,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const Search_Summaries = async (req, res) => {
    const userId = req.decoded.userId;
    const { search } = req.query;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const summarys = await Summary.findAll({
            where: {
                Title: {
                    [Op.like]: `%${search}%`,
                },
            },
            order: [["createdAt", "DESC"]],
        });
        // if (!summarys)
        //     return res.status(404).json({ error: "No summarys found." });
        return res.status(200).json({ Summaries: summarys });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
module.exports = {
    GetSummary,
    Get_Summaries,
    Search_Summaries,
};
