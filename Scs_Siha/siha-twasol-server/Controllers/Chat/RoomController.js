const { Messages } = require("../../Models/Messages");
const { Malad } = require("../../Models/Malad");
const { Doctor } = require("../../Models/Doctor");
const { MessagesRoom } = require("../../Models/Messages");

const openChatRoom = async (req, res) => {
    try {
        const { maladId, doctorId } = req.body;

        // Validate maladId and doctorId
        if (!maladId || !doctorId) {
            return res
                .status(400)
                .json({ error: "Malad ID and Doctor ID are required" });
        } else if (isNaN(maladId) || isNaN(doctorId)) {
            return res
                .status(400)
                .json({ error: "Malad ID and Doctor ID must be numbers" });
        }

        // Check if the malad exists
        const malad = await Malad.findByPk(maladId);
        if (!malad) {
            return res.status(404).json({ error: "Malad not found" });
        }

        // Check if the doctor exists
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        // Check if the chat room already exists
        const existingRoom = await MessagesRoom.findOne({
            where: {
                maladId: maladId,
                doctorId: doctorId,
            },
        });

        if (existingRoom) {
            return res.status(400).json({ error: "Chat room already exists" });
        }

        // Create a new chat room
        const newRoom = await MessagesRoom.create({
            maladId: maladId,
            doctorId: doctorId,
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
