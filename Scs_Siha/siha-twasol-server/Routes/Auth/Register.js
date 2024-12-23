const express = require("express");
const router = express.Router();
const { Malad } = require("../../Models/Malad");
const { Director } = require("../../Models/Director");
const { Doctor } = require("../../Models/Doctor");
const { Worker } = require("../../Models/Worker");
const handleRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(409).json({ message: "Missing Data" });
        } else if (firstName.length < 3) {
            return res.status(409).json({
                message: "First Name must be more that 3 chars",
            });
        } else if (lastName.length < 3) {
            return res.status(409).json({
                message: "Last Name must be more that 3 chars",
            });
        } else if (firstName.length > 14) {
            return res.status(409).json({
                message: "First Name must be less than 14 chars",
            });
        } else if (lastName.length > 14) {
            return res.status(409).json({
                message: "lastName must be less than 14 chars",
            });
        } else if (password.length < 8) {
            return res.status(409).json({
                message: "password must be at least 8 characters",
            });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            return res.status(409).json({ message: "Invalid email" });
        }
        // if (!(await isemailValid(email))) {
        //     return res.status(409).json({ message: "Invalid email domain" });
        // }
        const exist_doctor = await Doctor.findOne({
            where: { email: email },
        });
        const exist_worker = await Worker.findOne({
            where: { email: email },
        });
        const exist_malad = await Malad.findOne({
            where: { email: email },
        });
        const exist_director = await Director.findOne({
            where: { email: email },
        });
        if (exist_malad || exist_doctor || exist_director || exist_worker) {
            return res.status(400).json({
                message: "email already exists , please use another email.",
            });
        }
        let newUser = null;
        newUser = await Malad.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        if (!newUser) {
            return res.status(500).json({ message: "Error Creating User" });
        }
        return res.status(200).json({
            message: "Account Created Successfully",
            id: newUser.id,
        });
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({ message: err });
    }
};

router.post("/", handleRegister);

module.exports = router;
