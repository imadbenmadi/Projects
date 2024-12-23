const express = require("express");
const router = express.Router();
const { Admins } = require("../../../Models/Admin/Admin");

const handleRegister = async (req, res) => {
    try {
        const { email, password, firstName, lastName, telephone } = req.body;
        if (!email || !password) {
            return res.status(409).json({ message: "Missing Data" });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            return res.status(409).json({ message: "Invalid email" });
        } else if (password.length < 8) {
            return res.status(409).json({
                message: "password must be at least 8 characters",
            });
        }

        const exist_Admin = await Admins.findOne({
            where: { email: email },
        });
        if (exist_Admin) {
            return res.status(400).json({
                message: "email already exists , please use another email.",
            });
        }

        const newAdmin = await Admins.create({
            email: email,
            password: password,
            firstName: firstName ? firstName : null,
            lastName: lastName ? lastName : null,
            telephone: telephone ? telephone : null,
        });

        if (!newAdmin) {
            return res.status(500).json({ message: "Error Creating Admin" });
        }
        return res.status(200).json({
            message: "Admin Created Successfully",
            id: newAdmin.id,
        });
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({ message: err });
    }
};

router.post("/", handleRegister);

module.exports = router;
