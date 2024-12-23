const express = require("express");
const router = express.Router();
const { Projects } = require("../../Models/Project");
const Admin_midllware = require("../../Middlewares/Admin");
const { Applications } = require("../../Models/Applications");
const { Clients } = require("../../Models/Client");
const { Freelancers } = require("../../Models/Freelnacer");
const { Op } = require("sequelize");
const { Sequelize, DataTypes } = require("sequelize");
const { MessagesRoom } = require("../../Models/Messages");

const {
    Freelancer_Notifications,
    Client_Notifications,
} = require("../../Models/Notifications");
router.get("/", Admin_midllware, async (req, res) => {
    try {
        // Fetch projects with their associated applications and client (company name)
        const projects = await Projects.findAll({
            where: {
                status: "accepted",
                FreelancerId: null,
            },
            include: [
                {
                    model: Applications,
                    as: "Applications",
                    attributes: [],
                },
                {
                    model: Clients,
                    as: "owner",
                    attributes: ["company_Name"], // Assuming "name" is the client's company name
                },
            ],
            attributes: {
                include: [
                    [
                        Sequelize.fn("COUNT", Sequelize.col("Applications.id")),
                        "applicationsCount",
                    ],
                ],
            },
            group: ["Projects.id", "owner.id"],
            order: [["createdAt", "DESC"]],
        });

        // Prepare the data to send
        const data_to_send = projects.map((project) => ({
            id: project.id,
            title: project.Title,
            createdAt: project.createdAt,
            companyName: project.owner.company_Name,
            applicationsCount: project.dataValues.applicationsCount,
        }));

        res.status(200).json({ projects: data_to_send });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
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
        const applications = await Applications.findAll({
            where: {
                ProjectId: projectId,
            },
            include: [
                {
                    model: Projects,
                    as: "Project",
                    include: [{ model: Clients, as: "owner" }],
                },
                { model: Freelancers, as: "Freelancer" },
            ],
            order: [["createdAt", "DESC"]],
        });
        // console.log("applications : ", applications);
        res.status(200).json({ Applications: applications });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

router.get("/:projectId/:ApplicationId", Admin_midllware, async (req, res) => {
    const projectId = req.params.projectId;
    const ApplicationId = req.params.ApplicationId;
    if (!projectId)
        return res
            .status(409)
            .json({ message: "Missing data ProjectId is required" });
    else if (!ApplicationId)
        return res
            .status(409)
            .json({ message: "Missing data ApplicationId is required" });
    try {
        const applications = await Applications.findOne({
            where: {
                // status: "Pending",
                ProjectId: projectId,
                id: ApplicationId,
            },
        });
        res.status(200).json({ Application: applications });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

router.post(
    "/:projectId/:freelancerId/accept",
    Admin_midllware,
    async (req, res) => {
        const { projectId, freelancerId } = req.params;
        const Money = req.body.Money;
        const DeadLine = req.body.DeadLine;
        if (!Money)
            return res
                .status(409)
                .json({ message: "Missing data Money is required" });
        if (!DeadLine)
            return res
                .status(409)
                .json({ message: "Missing data DeadLine is required" });
        if (!projectId) {
            return res
                .status(409)
                .json({ message: "Missing data: ProjectId is required" });
        }

        if (!freelancerId) {
            return res
                .status(409)
                .json({ message: "Missing data: freelancerId is required" });
        }

        try {
            const application = await Applications.findOne({
                where: { ProjectId: projectId, FreelancerId: freelancerId },
            });
            if (!application) {
                return res
                    .status(404)
                    .json({ message: "Application not found" });
            }

            const project = await Projects.findOne({
                where: { id: projectId },
            });

            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            await Applications.update(
                { status: "Accepted" },
                { where: { FreelancerId: freelancerId, ProjectId: projectId } }
            );

            await Projects.update(
                {
                    FreelancerId: application.FreelancerId,
                    Money: Money,
                    DeadLine: DeadLine,
                },
                { where: { id: projectId } }
            );
            try {
                await Freelancer_Notifications.create({
                    title: "Application accepted",
                    text: "Your Application to the project have been accepted . we are waiting the Client Payment to start the project",
                    type: "Project_Accepted",
                    FreelancerId: application.FreelancerId,
                    link: `/Freelancer/Process/${project.id}`,
                });
                await Client_Notifications.create({
                    title: "Freelancer Found",
                    text: "Pay the fees so the freelancer can start working",
                    type: "Freelancer_found",
                    ClientId: project.ClientId,
                    link: `/Client/Projects/${project.id}`,
                });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            try {
                const clientId = project.ClientId;
                let newRoom;
                if (clientId) {
                    const existingRoom = await MessagesRoom.findOne({
                        where: {
                            freelancerId: freelancerId,
                            clientId: clientId,
                        },
                    });
                    if (!existingRoom) {
                        newRoom = await MessagesRoom.create({
                            freelancerId: freelancerId,
                            clientId: clientId,
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }

            res.status(200).json({ message: "Application Approved" });
        } catch (err) {
            console.error("Error processing application approval:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);
router.post(
    "/:projectId/:freelancerId/Reject",
    Admin_midllware,
    async (req, res) => {
        const projectId = req.params.projectId;
        const freelancerId = req.params.freelancerId;
        if (!projectId)
            return res
                .status(409)
                .json({ message: "Missing data ProjectId is required" });
        else if (!freelancerId)
            return res
                .status(409)
                .json({ message: "Missing data freelancerId is required" });
        try {
            const application = await Applications.findOne({
                where: {
                    // status: "Pending",
                    ProjectId: projectId,
                    FreelancerId: freelancerId,
                },
            });
            if (!application)
                return res
                    .status(404)
                    .json({ message: "Application not found" });

            await Applications.update(
                {
                    status: "Rejected",
                },
                { where: { FreelancerId: freelancerId, ProjectId: projectId } }
            );

            res.status(200).json({ message: "Application Rejected" });
        } catch (err) {
            console.error("Error fetching Project Applications:", err);
            res.status(500).json({ message: err });
        }
    }
);

module.exports = router;
