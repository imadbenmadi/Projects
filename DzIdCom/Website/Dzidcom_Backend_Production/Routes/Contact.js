const express = require("express");
const router = express.Router();
const { Contact_Messages } = require("../Models/Contact_Messages");
const handle_send_contact_message = async (req, res) => {
    try {
        const { email, message, lastName, firstName } = req.body;
        if (!email || !message || !firstName || !lastName) {
            return res.status(409).json({ message: "Missing Data" });
        } else if (
            email &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        ) {
            return res.status(409).json({ message: "Invalid email" });
        }
        await Contact_Messages.create({
            email,
            message,
            lastName,
            firstName,
        });
        return res.status(200).json({
            message: "Message Sent Successfully via email",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
router.post("/", handle_send_contact_message);

module.exports = router;
