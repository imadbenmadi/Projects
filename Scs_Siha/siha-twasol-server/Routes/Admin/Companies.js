const express = require("express");
const router = express.Router();
const { Company } = require("../../Models/Company");
const { Service } = require("../../Models/Company");
const { Director } = require("../../Models/Director");
const { Worker } = require("../../Models/Worker");
const { Doctor } = require("../../Models/Doctor");
const { malad_follow } = require("../../Models/Malad");
const { Malad } = require("../../Models/Malad");
const Admin_midllware = require("../../Middlewares/Admin_middleware");

router.get("/", Admin_midllware, async (req, res) => {
    try {
        const companies = await Company.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ companies });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

router.get("/:id", Admin_midllware, async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    try {
        const company = await Company.findOne({
            where: { id: req.params.id },
            include: [
                { model: Service, as: "Services" },
                { model: Director, as: "Directors" },
                { model: Worker, as: "Workers" },
                { model: Doctor, as: "Doctors" },
                { model: malad_follow, as: "malad_follows" },
            ],
        });

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ company });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

router.post("/", Admin_midllware, async (req, res) => {
    const { Name, Location, Wilaya, Type, director_email, director_password } =
        req.body;
    if (
        !Name ||
        !Location ||
        !Wilaya ||
        !Type ||
        !director_email ||
        !director_password
    ) {
        return res.status(400).json({ message: "Missing required fields" });
    } else if (Name < 3) {
        return res.status(409).json({
            message: "Name must be more that 3 chars",
        });
    } else if (Location < 3) {
        return res.status(409).json({
            message: "Location must be more that 3 chars",
        });
    } else if (Wilaya < 3) {
        return res.status(409).json({
            message: "Wilaya must be more that 3 chars",
        });
    } else if (Type < 3) {
        return res.status(409).json({
            message: "Type must be more that 3 chars",
        });
    } else if (director_password.length < 8) {
        return res.status(409).json({
            message: "password must be at least 8 characters",
        });
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(director_email)
    ) {
        return res.status(409).json({ message: "Invalid email" });
    }
    try {
        const exist_doctor = await Doctor.findOne({
            where: { email: director_email },
        });
        const exist_worker = await Worker.findOne({
            where: { email: director_email },
        });
        const exist_malad = await Malad.findOne({
            where: { email: director_email },
        });
        const exist_director = await Director.findOne({
            where: { email: director_email },
        });

        if (exist_malad || exist_doctor || exist_worker || exist_director) {
            return res.status(400).json({
                message: "email already exists , please use another email.",
            });
        }
        const company = await Company.create({
            Name,
            Location,
            Wilaya,
            Type,
        });
        await Director.create({
            email: director_email,
            password: director_password,
            companyId: company.id,
        });
        res.status(200).json({ message: "Company created", company });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

router.delete("/:id", Admin_midllware, async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    try {
        const company = await Company.findOne({
            where: { id: req.params.id },
        });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        await company.destroy();
        await Director.destroy({ where: { companyId: req.params.id } });
        res.status(200).json({ message: "Company deleted" });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});
router.put("/:id", Admin_midllware, async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const { Name, Location, Wilaya, Type, director_email, director_password } =
        req.body;
    try {
        const company = await Company.findOne({
            where: { id: req.params.id },
        });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        if (!Name || !Location || !Wilaya || !Type) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await company.update({
            Name,
            Location,
            Wilaya,
            Type,
        });
        if (director_email || director_password)
            await Director.update(
                {
                    email: director_email,
                    password: director_password,
                },
                { where: { companyId: req.params.id } }
            );
        res.status(200).json({ company });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

module.exports = router;
