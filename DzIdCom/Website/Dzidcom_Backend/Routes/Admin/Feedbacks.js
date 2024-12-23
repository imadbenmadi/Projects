const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin");
const { Freelancers } = require("../../Models/Freelnacer");
const { Clients } = require("../../Models/Client");
const { Projects } = require("../../Models/Project");
const {
    Freelancer_Feedbacks,
    Client_Feedbacks,
    Home_Feedbacks,
} = require("../../Models/Feedbacks");

router.get("/Clients", adminMiddleware, async (req, res) => {
    try {
        const feedbacks = await Client_Feedbacks.findAll({
            where: {},
            include: [
                { model: Freelancers, as: "Freelancer" },
                { model: Clients, as: "Client" },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ feedbacks });
    } catch (err) {
        console.error("Error fetching client feedbacks:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Freelancers", adminMiddleware, async (req, res) => {
    try {
        const feedbacks = await Freelancer_Feedbacks.findAll({
            include: [
                { model: Freelancers, as: "Freelancer" },
                { model: Clients, as: "Client" },
            ],
            where: {},
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ feedbacks });
    } catch (err) {
        console.error("Error fetching freelancer feedbacks:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/Clients/:feedbackId", adminMiddleware, async (req, res) => {
    try {
        const feedbackId = req.params.feedbackId;
        const feedback = await Client_Feedbacks.findOne({
            where: { id: feedbackId },
        });
        if (!feedback)
            return res.status(404).json({ message: "Feedback not found" });

        const feedbackInHome = await Home_Feedbacks.findOne({
            where: { id: feedbackId },
        });
        if (feedbackInHome)
            await Home_Feedbacks.destroy({ where: { id: feedbackId } });

        await Client_Feedbacks.destroy({ where: { id: feedbackId } });
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (err) {
        console.error("Error deleting client feedback:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/Freelancers/:feedbackId", adminMiddleware, async (req, res) => {
    try {
        const feedbackId = req.params.feedbackId;
        const feedback = await Freelancer_Feedbacks.findOne({
            where: { id: feedbackId },
        });
        if (!feedback)
            return res.status(404).json({ message: "Feedback not found" });

        const feedbackInHome = await Home_Feedbacks.findOne({
            where: { id: feedbackId },
        });
        if (feedbackInHome)
            await Home_Feedbacks.destroy({ where: { id: feedbackId } });

        await Freelancer_Feedbacks.destroy({ where: { id: feedbackId } });
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (err) {
        console.error("Error deleting freelancer feedback:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post(
    "/Home_Feedbacks/Client/:feedbackId",
    adminMiddleware,
    async (req, res) => {
        try {
            const feedbackId = req.params.feedbackId;
            const feedback = await Client_Feedbacks.findOne({
                where: { id: feedbackId },
            });
            if (!feedback)
                return res.status(404).json({ message: "Feedback not found" });

            // const alreadyExistInHomepage = await Home_Feedbacks.findOne({
            //     where: { FeedbackId: feedbackId },
            // });
            // if (alreadyExistInHomepage)
            //     return res
            //         .status(409)
            //         .json({ message: "Feedback already exists on homepage" });

            const client = await Clients.findOne({
                where: { id: feedback.ClientId },
            });
            if (!client)
                return res.status(404).json({ message: "Client not found" });

            const newFeedback = await Home_Feedbacks.create({
                FeedbackId: feedbackId,
                image_link: client.profile_pic_link,
                full_user_name: `${client.firstName} ${client.lastName}`,
                Rate: feedback.Rate,
                Comment: feedback.Comment,
                userType: "Client",
            });

            await Client_Feedbacks.update(
                { inHome: true },
                { where: { id: feedbackId } }
            );
            res.status(200).json({
                message: "Feedback added to homepage successfully",
                feedback: newFeedback,
            });
        } catch (err) {
            console.error("Error adding client feedback to homepage:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

router.post(
    "/Home_Feedbacks/Freelancer/:feedbackId",
    adminMiddleware,
    async (req, res) => {
        try {
            const feedbackId = req.params.feedbackId;
            const feedback = await Freelancer_Feedbacks.findOne({
                where: { id: feedbackId },
            });
            if (!feedback)
                return res.status(404).json({ message: "Feedback not found" });

            // const alreadyExistInHomepage = await Home_Feedbacks.findOne({
            //     where: { FeedbackId: feedbackId },
            // });
            // if (alreadyExistInHomepage)
            //     return res
            //         .status(409)
            //         .json({ message: "Feedback already exists on homepage" });

            const freelancer = await Freelancers.findOne({
                where: { id: feedback.FreelancerId },
            });
            if (!freelancer)
                return res
                    .status(404)
                    .json({ message: "Freelancer not found" });

            const newFeedback = await Home_Feedbacks.create({
                FeedbackId: feedbackId,
                image_link: freelancer.profile_pic_link,
                full_user_name: `${freelancer.firstName} ${freelancer.lastName}`,
                Rate: feedback.Rate,
                Comment: feedback.Comment,
                userType: "Freelancer",
            });
            // console.log(newFeedback);
            await Freelancer_Feedbacks.update(
                { inHome: true },
                { where: { id: feedbackId } }
            );
            res.status(200).json({
                message: "Feedback added to homepage successfully",
                feedback: newFeedback,
            });
        } catch (err) {
            console.error("Error adding freelancer feedback to homepage:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

router.delete(
    "/Home_Feedbacks/:feedbackId",
    adminMiddleware,
    async (req, res) => {
        try {
            const feedbackId = req.params.feedbackId;
            const feedback = await Home_Feedbacks.findOne({
                where: { id: feedbackId },
            });
            if (!feedback)
                return res.status(404).json({ message: "Feedback not found" });

            if (feedback.userType === "Client") {
                await Client_Feedbacks.update(
                    { inHome: false },
                    { where: { id: feedback.FeedbackId } }
                );
            } else if (feedback.userType === "Freelancer") {
                await Freelancer_Feedbacks.update(
                    { inHome: false },
                    { where: { id: feedback.FeedbackId } }
                );
            } else {
                return res.status(404).json({ message: "Feedback not found" });
            }
            await Home_Feedbacks.destroy({ where: { id: feedbackId } });
            res.status(200).json({ message: "Feedback deleted successfully" });
        } catch (err) {
            console.error("Error deleting homepage feedback:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

module.exports = router;
