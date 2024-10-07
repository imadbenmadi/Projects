const Database = require("../database");
const db = new Database();

const getAllMessages = async function (req, res) {
    let result = await db.getMessages();
    res.json(result);
};
const addMessage = async function (req, res) {
    const { user, text } = req.body;

    if (!user || !text) {
        return res.status(400).json({ message: "User and text are required" });
    }

    try {
        const messageData = {
            user,
            text,
            createdDate: new Date(), // You can set the createdDate here
        };

        await db.addMessage(messageData); // Use the addMessage method
        res.status(201).json({ message: "Message added successfully" });
    } catch (error) {
        console.error("Error adding message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = { getAllMessages, addMessage };
