const { Messages } = require("../Models/Messages"); // Adjust the path as necessary
const { Freelancers } = require("../Models/Freelnacer");
const { Clients } = require("../Models/Client");
// Send a message
exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, message, senderType } = req.body;

    try {
        const newMessage = await Messages.create({
            senderId,
            receiverId,
            message,
            senderType,
        });
        res.status(200).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send message" });
    }
};

// Get messages for a specific user
exports.getMessages = async (req, res) => {
    const { userId, userType } = req.params;

    try {
        let messages;

        if (userType === "freelancer") {
            messages = await Messages.findAll({
                where: { receiverId: userId, senderType: "client" },
                include: [{ model: Clients, as: "senderClient" }],
            });
        } else if (userType === "client") {
            messages = await Messages.findAll({
                where: { receiverId: userId, senderType: "freelancer" },
                include: [{ model: Freelancers, as: "senderFreelancer" }],
            });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};
