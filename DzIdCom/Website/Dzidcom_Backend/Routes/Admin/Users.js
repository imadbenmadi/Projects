const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin");
const { Freelancers } = require("../../Models/Freelnacer");
const { PortfolioItems } = require("../../Models/Freelnacer");
const { Skills } = require("../../Models/Freelnacer");

const { Clients } = require("../../Models/Client");
const {
    Freelancer_Feedbacks,
    Client_Feedbacks,
} = require("../../Models/Feedbacks");
router.get("/", adminMiddleware, async (req, res) => {
    try {
        const freelancers = await Freelancers.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });
        const clients = await Clients.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });

        // Add userType to each user object
        const freelancerUsers = freelancers.map((freelancer) => ({
            ...freelancer.toJSON(),
            userType: "freelancer",
        }));
        const clientUsers = clients.map((client) => ({
            ...client.toJSON(),
            userType: "client",
        }));

        const users = [...freelancerUsers, ...clientUsers];

        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Send the combined array in the response
        res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/Clients/:id", adminMiddleware, async (req, res) => {
    const clientId = req.params.id;
    if (!clientId)
        return res.status(409).json({ message: "Client ID is required" });
    try {
        const client = await Clients.findOne({
            where: { id: clientId },
            attributes: { exclude: ["password"] },
        });
        if (!client)
            return res.status(404).json({ message: "Client not found" });
        res.status(200).json({ user: client });
    } catch (err) {
        console.error("Error fetching client:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Freelancers/:id", adminMiddleware, async (req, res) => {
    const freelancerId = req.params.id;
    if (!freelancerId)
        return res.status(409).json({ message: "Freelancer ID is required" });
    try {
        const freelancer = await Freelancers.findOne({
            where: { id: freelancerId },
            include: [
                { model: PortfolioItems, as: "PortfolioItems" },
                { model: Skills, as: "Skills" },
            ],
            attributes: { exclude: ["password"] },
        });
        if (!freelancer)
            return res.status(404).json({ message: "Freelancer not found" });
        res.status(200).json({ user: freelancer });
    } catch (err) {
        console.error("Error fetching freelancer:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Freelancers/:id/Feedbacks", adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        return res.status(409).json({ error: "Unauthorized , missing userId" });
    try {
        const Feedbacks = await Client_Feedbacks.findAll({
            where: {
                FreelancerId: userId,
            },
            include: [
                { model: Freelancers, as: "Freelancer" },
                { model: Clients, as: "Client" },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!Feedbacks)
            return res.status(404).json({ error: "No Feedbacks found." });
        return res.status(200).json({ Feedbacks: Feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.get("/Clients/:id/Feedbacks", adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        return res.status(409).json({ error: "Unauthorized , missing userId" });
    try {
        const Feedbacks = await Freelancer_Feedbacks.findAll({
            where: {
                ClientId: userId,
            },
            include: [
                { model: Freelancers, as: "Freelancer" },
                { model: Clients, as: "Client" },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!Feedbacks)
            return res.status(404).json({ error: "No Feedbacks found." });
        return res.status(200).json({ Feedbacks: Feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

router.delete("/Client/:id", adminMiddleware, async (req, res) => {
    const clientId = req.params.id;
    if (!clientId)
        return res.status(409).json({ message: "client id is required" });
    try {
        await Clients.destroy({ where: { id: clientId } });
        res.status(200).json({ message: "client deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting client:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/Freelancer/:id", adminMiddleware, async (req, res) => {
    const freelancerId = req.params.id;
    if (!freelancerId)
        return res.status(409).json({ message: "Freelancer id is required" });
    try {
        await Freelancers.destroy({ where: { id: freelancerId } });
        res.status(200).json({ message: "Freelancer deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting Freelancer:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
