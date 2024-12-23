const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin_middleware");

const { Malad } = require("../../Models/Malad");
const { Doctor } = require("../../Models/Doctor");
const { Worker } = require("../../Models/Worker");
const { Malad_Rates, Doctor_Rates } = require("../../Models/Rates");
router.get("/", adminMiddleware, async (req, res) => {
    try {
        const malads = await Malad.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });
        const doctors = await Doctor.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });
        const workers = await Worker.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });

        // Add userType to each user object
        const maladUsers = malads.map((malad) => ({
            ...malad.toJSON(),
            userType: "malad",
        }));
        const doctorUsers = doctors.map((doctor) => ({
            ...doctor.toJSON(),
            userType: "doctor",
        }));
        const workerUsers = workers.map((worker) => ({
            ...worker.toJSON(),
            userType: "worker",
        }));
        const users = [...maladUsers, ...doctorUsers, ...workerUsers];

        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Send the combined array in the response
        res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/Doctors/:id", adminMiddleware, async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    const DoctorId = req.params.id;
    try {
        const Doctor = await Doctor.findOne({
            where: { id: DoctorId },
            attributes: { exclude: ["password"] },
        });
        if (!Doctor)
            return res.status(404).json({ message: "Doctor not found" });
        res.status(200).json({ user: Doctor });
    } catch (err) {
        console.error("Error fetching Doctor:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Malads/:id", adminMiddleware, async (req, res) => {
    const maladId = req.params.id;
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    try {
        const malad = await Malad.findOne({
            where: { id: maladId },
            attributes: { exclude: ["password"] },
        });
        if (!malad) return res.status(404).json({ message: "malad not found" });
        res.status(200).json({ user: malad });
    } catch (err) {
        console.error("Error fetching malad:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Malads/:id/Feedbacks", adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    try {
        const Feedbacks = await Doctor_Rates.findAll({
            where: {
                maladId: userId,
            },
            include: [
                { model: Malad, as: "Malad" },
                { model: Doctor, as: "Doctor" },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!Feedbacks)
            return res.status(404).json({ message: "No Feedbacks found." });
        return res.status(200).json({ Feedbacks: Feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
router.get("/Doctors/:id/Feedbacks", adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    try {
        const Feedbacks = await Malad_Rates.findAll({
            where: {
                doctorId: userId,
            },
            include: [
                { model: Malad, as: "Malad" },
                { model: Doctor, as: "Doctor" },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!Feedbacks)
            return res.status(404).json({ message: "No Feedbacks found." });
        return res.status(200).json({ Feedbacks: Feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
router.delete("/Malads/:id", adminMiddleware, async (req, res) => {
    const maladId = req.params.id;
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    try {
        const malad = await Malad.findOne({
            where: { id: maladId },
        });
        if (!malad) return res.status(404).json({ message: "malad not found" });
        await Malad.destroy({ where: { id: maladId } });
        res.status(200).json({ message: "malad deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting malad:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/Doctors/:id", adminMiddleware, async (req, res) => {
    const DoctorId = req.params.id;
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    try {
        const Doctor = await Doctor.findOne({
            where: { id: DoctorId },
        });
        if (!Doctor)
            return res.status(404).json({ message: "Doctor not found" });
        await Doctor.destroy({ where: { id: DoctorId } });
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting Doctor:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
