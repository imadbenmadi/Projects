const express = require("express");
const router = express.Router();
const { Projects } = require("../../Models/Project");
const { Freelancers } = require("../../Models/Freelnacer");
const { Clients } = require("../../Models/Client");
const Admin_midllware = require("../../Middlewares/Admin");
const { Op } = require("sequelize");

const {
    Freelancer_Notifications,
    Client_Notifications,
} = require("../../Models/Notifications");
router.get("/", Admin_midllware, async (req, res) => {
    try {
        const projects = await Projects.findAll({
            // where: { status: "Pending" },
            // where: { isPayment_ScreenShot_uploaded: true },
            where: {
                status: {
                    [Op.notIn]: ["Rejected", "Completed", "Pending", "Payed"],
                },
                FreelancerId: { [Op.not]: null },
            },
            include: [
                { model: Clients, as: "owner" },
                { model: Freelancers, as: "Freelancer" },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ projects: projects });
    } catch (err) {
        console.error("Error fetching Project projects:", err);
        res.status(500).json({ message: err });
    }
});
router.get("/:projectId", Admin_midllware, async (req, res) => {
    const projectId = req.params.projectId;
    if (!projectId)
        return res
            .status(409)
            .json({ message: "Missing data ProjectId is required" });

    try {
        const project = await Projects.findOne({
            // where: { status: "Pending" },
            // where: { isPayment_ScreenShot_uploaded: true },
            where: {
                id: projectId,
                status: {
                    [Op.notIn]: ["Rejected", "Completed", "Pending", "Payed"],
                },
                FreelancerId: { [Op.not]: null },
            },
            include: [
                { model: Clients, as: "owner" },
                { model: Freelancers, as: "Freelancer" },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ project: project });
    } catch (err) {
        console.error("Error fetching Project projects:", err);
        res.status(500).json({ message: err });
    }
});
router.get("/Accepted", Admin_midllware, async (req, res) => {
    try {
        const projects = await Projects.findAll({
            // where: { status: "Pending" },
            where: {
                isPayment_ScreenShot_uploaded: true,
                status: "Payed",
                isPayment_ScreenShot_Rejected: false,
            },
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ projects: projects });
    } catch (err) {
        console.error("Error fetching Project projects:", err);
        res.status(500).json({ message: err });
    }
});

// router.get("/:projectId", Admin_midllware, async (req, res) => {
//     const projectId = req.params.projectId;
//     if (!projectId)
//         return res
//             .status(409)
//             .json({ message: "Missing data ProjectId is required" });
//     try {
//         const projects = await projects.findOne({
//             where: {
//                 // status: "Pending",
//                 ProjectId: projectId,
//             },
//             order: [["createdAt", "DESC"]],
//         });
//         res.status(200).json({ projects: projects });
//     } catch (err) {
//         console.error("Error fetching Project projects:", err);
//         res.status(500).json({ message: err });
//     }
// });

router.post("/:projectId/Accept", Admin_midllware, async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        return res
            .status(409)
            .json({ message: "Missing data: ProjectId is required" });
    }

    try {
        const project = await Projects.findOne({
            where: { id: projectId },
        });
        if (!project) {
            return res.status(404).json({ message: "project not found" });
        } else if (
            project.status !== "Accepted" ||
            !project.isPayment_ScreenShot_uploaded ||
            !project.FreelancerId
        ) {
            return res.status(409).json({
                message:
                    "unauthorized , payment not uploaded or project not accepted or freelancer not assigned",
            });
        }
        await Projects.update(
            { status: "Payed", isPayment_ScreenShot_Rejected: false },
            { where: { id: projectId } }
        );
        try {
            await Client_Notifications.create({
                title: "Payment Accepted",
                text: "your payment has been successfully accepted and processed",
                type: "payment_accepted",
                ClientId: project.ClientId,
                link: `/Client/Projects/${project.id}`,
            });
            await Freelancer_Notifications.create({
                title: "Client payed the fees",
                text: "We are pleased to inform you that the Client has paid the fees, and you may now begin working on the project.",
                type: "payment_accepted",
                FreelancerId: project.FreelancerId,
                link: `/Freelancer/Process/${project.id}`,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "project payment accepted" });
    } catch (err) {
        console.error("Error processing project payment approval:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post("/:projectId/Reject", Admin_midllware, async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        return res
            .status(409)
            .json({ message: "Missing data: ProjectId is required" });
    }

    try {
        const project = await Projects.findOne({
            where: { id: projectId },
        });
        if (!project) {
            return res.status(404).json({ message: "project not found" });
        } else if (
            project.status !== "Accepted" ||
            !project.isPayment_ScreenShot_uploaded ||
            !project.FreelancerId
        ) {
            return res.status(409).json({
                message:
                    "unauthorized , payment not uploaded or project not accepted or freelancer not assigned",
            });
        }
        await Projects.update(
            {
                isPayment_ScreenShot_Rejected: true,
                status: "Accepted",
            },
            { where: { id: projectId } }
        );
        try {
            await Client_Notifications.create({
                title: "Payment Rejected",
                text: "We regret to inform you that your payment has been rejected, and we kindly request you to review your payment details and try again.",
                type: "payment_rejected",
                ClientId: project.ClientId,
                link: `/Client/Projects/${project.id}`,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: "project payment Rejected" });
    } catch (err) {
        console.error("Error processing project payment approval:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
