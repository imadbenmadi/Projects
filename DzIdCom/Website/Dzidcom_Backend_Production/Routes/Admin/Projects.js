const express = require("express");
const router = express.Router();
const { Projects } = require("../../Models/Project");
const Admin_midllware = require("../../Middlewares/Admin");
const { Client_Notifications } = require("../../Models/Notifications");
const { Clients } = require("../../Models/Client");
const { Freelancers } = require("../../Models/Freelnacer");
const { Rejection_Resons } = require("../../Models/Rejection_Resons");
const { Applications } = require("../../Models/Applications");
const { Op } = require("sequelize");
router.get("/", Admin_midllware, async (req, res) => {
    try {
        const projects = await Projects.findAll({
            include: [{ model: Clients, as: "owner" }],
            include: [{ model: Freelancers, as: "Freelancer" }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ Projects: projects });
    } catch (err) {
        console.error("Error fetching Project projects:", err);
        res.status(500).json({ message: err });
    }
});
router.get("/requests", Admin_midllware, async (req, res) => {
    try {
        const requests = await Projects.findAll({
            where: { status: "Pending" },
            include: [{ model: Clients, as: "owner" }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ Projects: requests });
    } catch (err) {
        console.error("Error fetching Project Requests:", err);
        res.status(500).json({ message: err });
    }
});
// router.get("/Applications", Admin_midllware, async (req, res) => {
//     try {
//         const applications = await Applications.findAll({
//             where: {
//                 status: { [Op.not]: "Accepted" },
//             },
//             include: [
//                 {
//                     model: Projects,
//                     as: "Project",
//                     include: [{ model: Clients, as: "owner" }],
//                 },
//                 { model: Freelancers, as: "Freelancer" },
//             ],
//             order: [["createdAt", "DESC"]],
//         });
//         res.status(200).json({ Projects: applications });
//     } catch (err) {
//         console.error("Error fetching Project applications:", err);
//         res.status(500).json({ message: err });
//     }
// });

router.get("/Payments", Admin_midllware, async (req, res) => {
    try {
        const payment_requests = await Projects.findAll({
            where: {
                status: "Accepted",
                FreelancerId: { [Op.not]: null },

                // isPayment_ScreenShot_uploaded: false,
            },
            include: [
                { model: Clients, as: "owner" },
                { model: Freelancers, as: "Freelancer" },
            ],
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({ Projects: payment_requests });
    } catch (err) {
        console.error("Error fetching Project payment_requests:", err);
        res.status(500).json({ message: err });
    }
});

// router.get("/Applications/:projectId", Admin_midllware, async (req, res) => {
//     const projectId = req.params.projectId;
//     if (!projectId) return res.status(409).json({ message: "Missing data" });
//     try {
//         const project = await Projects.findOne({
//             where: { id: projectId },
//             include: [
//                 { model: Clients, as: "owner" },
//                 { model: Freelancers, as: "Freelancer" },
//             ],
//         });
//         if (!project)
//             return res.status(404).json({ message: "Project not found" });

//         res.status(200).json({ project });
//     } catch (err) {
//         console.error("Error fetching Project:", err);
//         res.status(500).json({ message: err.message });
//     }
// });
router.get("/requests/:projectId", Admin_midllware, async (req, res) => {
    const projectId = req.params.projectId;
    if (!projectId) return res.status(409).json({ message: "Missing data" });
    try {
        const project = await Projects.findOne({
            where: { id: projectId },
        });
        if (!project)
            return res.status(404).json({ message: "Project not found" });

        res.status(200).json({ project });
    } catch (err) {
        console.error("Error fetching Project:", err);
        res.status(500).json({ message: err.message });
    }
});
router.get(
    "/requests/:projectId/Rejections",
    Admin_midllware,
    async (req, res) => {
        const projectId = req.params.projectId;
        if (!projectId)
            return res.status(409).json({ message: "Missing data" });
        try {
            let Rejections = await Rejection_Resons.findOne({
                where: { ProjectId: projectId },
            });
            if (!Rejections) Rejections = [];
            // return res
            //     .status(404)
            //     .json({ message: "Rejections not found" });

            res.status(200).json({ Rejections });
        } catch (err) {
            console.error("Error fetching Rejections:", err);
            res.status(500).json({ message: err.message });
        }
    }
);

router.post(
    "/requests/:projectId/Accept",
    Admin_midllware,
    async (req, res) => {
        const projectId = req.params.projectId;
        if (!projectId)
            return res.status(409).json({ message: "Missing data" });
        try {
            const Project = await Projects.findOne({
                where: { id: projectId },
            });
            if (!Project)
                return res.status(404).json({ message: "Project not found" });

            await Project.update({ status: "Accepted" });
            try {
                await Client_Notifications.create({
                    title: "Project Accepted",
                    text: "We have accepted the project you requested. Click here to see the rest of the details",
                    type: "Project_Accepted",
                    ClientId: Project.ClientId,
                    link: `/Client/Projects/${Project.id}`,
                });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json({ message: "Project Approved" });
        } catch (err) {
            console.error("Error fetching Project Requests:", err);
            res.status(500).json({ message: err.message });
        }
    }
);
router.post(
    "/requests/:projectId/Reject",
    Admin_midllware,
    async (req, res) => {
        const projectId = req.params.projectId;
        if (!projectId)
            return res.status(409).json({ message: "Missing data" });
        try {
            const Project = await Projects.findOne({
                where: { id: projectId },
            });
            if (!Project)
                return res.status(404).json({ message: "Project not found" });

            await Project.update({ status: "Rejected" });
            try {
                await Client_Notifications.create({
                    title: "Project refused",
                    text: "It was rejected for a number of reasons related to our platform, Click here to create a new project",
                    type: "Projet_refused",
                    ClientId: Project.ClientId,
                    link: `/Client/Projects/${Project.id}`,
                });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json({ message: "Project Rejected" });
        } catch (err) {
            console.error("Error fetching Project Requests:", err);
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports = router;
