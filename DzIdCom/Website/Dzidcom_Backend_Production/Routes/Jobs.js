const express = require("express");
const router = express.Router();
const { Projects } = require("../Models/Project");
const { Applications } = require("../Models/Applications");
const Freelancer_Middleware = require("../Middlewares/Freelancer");
const { Op } = require("sequelize");

// router.get("/", Freelancer_Middleware, async (req, res) => {
//     const { search, filter } = req.query;
//     try {
//         const requests = await Projects.findAll({
//             where: { status: "Pending" },
//         });
//         res.status(200).json({ Projects: requests });
//     } catch (err) {
//         console.error("Error fetching Project Requests:", err);
//         res.status(500).json({ message: err.message });
//     }
// });
router.get("/", Freelancer_Middleware, async (req, res) => {
    const { search, Content_creation, SEO_SIM, Graphic_design } = req.query;

    const whereClause = {
        status: "Accepted",
        FreelancerId: null,
    };

    // Handle search by title and description
    if (search) {
        whereClause[Op.or] = [
            { Title: { [Op.like]: `%${search}%` } },

            // { Description: { [Op.like]: `%${search}%` } },
        ];
    }

    // Handle filters
    if (Content_creation === "true") {
        whereClause.Field_is_Content_creation = "1";
    }
    if (SEO_SIM === "true") {
        whereClause.Field_is_SEO_SIM = "1";
    }
    if (Graphic_design === "true") {
        whereClause.Field_is_Graphic_design = "1";
    }

    try {
        const requests = await Projects.findAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ Jobs: requests });
    } catch (err) {
        console.error("Error fetching Project Requests:", err);
        res.status(500).json({ message: err.message });
    }
});

router.get("/:projectId", Freelancer_Middleware, async (req, res) => {
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
router.post("/:projectId/Apply", Freelancer_Middleware, async (req, res) => {
    const projectId = req.params.projectId;
    if (!projectId)
        return res
            .status(409)
            .json({ message: "Missing data, project ID is required" });

    const freelancerId = req.decoded.userId;
    if (!freelancerId)
        return res
            .status(409)
            .json({ message: "Missing data, freelancer ID is required" });

    try {
        const { Freelancer_Time_Needed, Freelancer_Budget } = req.body;
        if (!Freelancer_Time_Needed || !Freelancer_Budget)
            return res.status(409).json({
                message:
                    "Missing data, Freelancer_Time_Needed and Freelancer_Budget are required",
            });
        const Project = await Projects.findOne({
            where: { id: projectId },
        });
        if (!Project)
            return res.status(404).json({ message: "Project not found" });
        const Alredy_Apply = await Applications.findOne({
            where: {
                ProjectId: projectId,
                FreelancerId: freelancerId,
            },
        });
        if (Alredy_Apply)
            return res.status(409).json({
                message: "You have already applied for this project",
            });
        const Applications_Lenght = await Applications.count({
            where: {
                FreelancerId: freelancerId,
                status: "Pending",
            },
        });
        if (Applications_Lenght > 5)
            return res.status(400).json({
                message:
                    "You have more than 5 Pending Applications , Please wait till the Platfom aprove your request",
            });
        // await Project.update({
        //     Freelancer_Time_Needed,
        //     Freelancer_Budget,
        //     where: { id: projectId },
        // });
        await Applications.create({
            ProjectId: projectId,
            FreelancerId: freelancerId,
            ProjectTitle: Project.Title,
            ProjectDescription: Project.Description,
            Freelancer_Time_Needed: Freelancer_Time_Needed,
            Freelancer_Budget: Freelancer_Budget,
        });

        res.status(200).json({ message: "Application submitted successfully" });
    } catch (err) {
        console.error("Error applying for project:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
