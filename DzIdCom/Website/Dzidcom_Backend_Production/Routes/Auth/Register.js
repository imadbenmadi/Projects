const express = require("express");
const router = express.Router();
const { Freelancers } = require("../../Models/Freelnacer");
const { Clients } = require("../../Models/Client");
const dns = require("dns");
// const {Project} = require("../../Models/Project");
const isemailValid = (email) => {
    return new Promise((resolve, reject) => {
        const domain = email.split("@")[1];
        dns.resolve(domain, "MX", (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                resolve(false); // No MX records found, domain is invalid
            } else {
                // Additional check for A or AAAA records to further validate domain existence
                dns.resolve(domain, (err, addresses) => {
                    if (err || !addresses || addresses.length === 0) {
                        resolve(false); // No A or AAAA records found, domain is invalid
                    } else {
                        resolve(true); // Domain is valid
                    }
                });
            }
        });
    });
};

const handleRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password, userType } = req.body;
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
        } else if (firstName.length > 30) {
            return res.status(409).json({
                message: "First Name must be less than 30 chars",
            });
        } else if (lastName.length > 30) {
            return res.status(409).json({
                message: "lastName must be less than 30 chars",
            });
        } else if (password.length < 8) {
            return res.status(409).json({
                message: "password must be at least 8 characters",
            });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            return res.status(409).json({ message: "Invalid email" });
        } else if (userType !== "client" && userType !== "freelancer") {
            return res.status(409).json({ message: "Invalid user type" });
        }
        // if (!(await isemailValid(email))) {
        //     return res.status(409).json({ message: "Invalid email domain" });
        // }
        const exist_freelancer = await Clients.findOne({
            where: { email: email },
        });
        const exist_client = await Freelancers.findOne({
            where: { email: email },
        });
        if (exist_client || exist_freelancer) {
            return res.status(400).json({
                message: "email already exists , please use another email.",
            });
        }
        let newUser = null;
        if (userType === "client") {
            newUser = await Clients.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });
        } else if (userType === "freelancer") {
            newUser = await Freelancers.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });
        }
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
