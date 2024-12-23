const { Messages } = require("../../Models/Messages");
const { Freelancers } = require("../../Models/Freelnacer");
const { Clients } = require("../../Models/Client");
const { MessagesRoom } = require("../../Models/Messages");

const openChatRoom = async (req, res) => {
    try {
        const { freelancerId, clientId } = req.body;

        // Validate freelancerId and clientId
        if (!freelancerId || !clientId) {
            return res
                .status(400)
                .json({ error: "Freelancer ID and Client ID are required" });
        } else if (isNaN(freelancerId) || isNaN(clientId)) {
            return res
                .status(400)
                .json({ error: "Freelancer ID and Client ID must be numbers" });
        }

        // Check if the freelancer exists
        const freelancer = await Freelancers.findByPk(freelancerId);
        if (!freelancer) {
            return res.status(404).json({ error: "Freelancer not found" });
        }

        // Check if the client exists
        const client = await Clients.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        // Check if the chat room already exists
        const existingRoom = await MessagesRoom.findOne({
            where: {
                freelancerId: freelancerId,
                clientId: clientId,
            },
        });

        if (existingRoom) {
            return res.status(400).json({ error: "Chat room already exists" });
        }

        // Create a new chat room
        const newRoom = await MessagesRoom.create({
            freelancerId: freelancerId,
            clientId: clientId,
        });

        res.status(200).json(newRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const deleteChatRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        // Validate roomId
        if (!roomId) {
            return res.status(400).json({ error: "Room ID is required" });
        } else if (isNaN(roomId)) {
            return res.status(400).json({ error: "Room ID must be a number" });
        }

        // Check if the chat room exists
        const chatRoom = await MessagesRoom.findByPk(roomId);
        if (!chatRoom) {
            return res.status(404).json({ error: "Chat room not found" });
        }

        // Delete all messages in the chat room
        await Messages.destroy({
            where: { roomId: roomId },
        });

        // Delete the chat room
        await MessagesRoom.destroy({
            where: { id: roomId },
        });

        res.status(200).json({
            message: "Chat room and all messages deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = { openChatRoom, deleteChatRoom };
