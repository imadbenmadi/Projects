const express = require("express");
const router = express.Router();
const Admin_midllware = require("../../Middlewares/Admin");
const { Op } = require("sequelize");

const { Freelancers } = require("../../Models/Freelnacer");
const { Clients } = require("../../Models/Client");
const { Projects } = require("../../Models/Project");
const { Applications } = require("../../Models/Applications");
router.get("/", Admin_midllware, async (req, res) => {
    try {
        let freelancers_nbr = await Freelancers.count({
            where: {},
        });
        let clients_nbr = await Clients.count({
            where: {},
        });
        let projects_nbr = await Projects.count({
            where: {
                status: {
                    [Op.in]: ["Accepted", "Payed", "Completed"],
                },
            },
        });
        // let payments = await Projects.count({
        //     where: { status: "Payed" },
        // });
        // let applications = await Applications.count({
        //     where: {},
        // });
        let freelancers = await Freelancers.findAll({
            where: {},
        });
        let clients = await Clients.findAll({
            where: {},
        });
        let projects = await Projects.findAll({
            where: {
                status: {
                    [Op.in]: ["Accepted", "Payed", "Completed"],
                },
            },
        });
        if (!freelancers_nbr) freelancers_nbr = 0;
        if (!clients_nbr) clients_nbr = 0;
        if (!projects_nbr) projects_nbr = 0;
        res.status(200).json({
            freelancers_nbr: freelancers_nbr,
            clients_nbr: clients_nbr,
            projects_nbr: projects_nbr,
            freelancers: freelancers,
            clients: clients,
            projects: projects,
        });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

module.exports = router;
