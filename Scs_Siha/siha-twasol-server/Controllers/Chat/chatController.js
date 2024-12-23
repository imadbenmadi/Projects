const { Messages, MessagesRoom } = require("../../Models/Messages");
const { Malad } = require("../../Models/Malad");
const { Doctor } = require("../../Models/Doctor");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const get_Malad_Rooms = async (req, res) => {
    try {
        const maladId = req.params.maladId;

        // Fetch the rooms that the malad is part of, including the latest message for each room
        const rooms = await MessagesRoom.findAll({
            where: {
                maladId: maladId,
            },
            include: [
                {
                    model: Doctor,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Malad,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Messages,
                    // attributes: ["message"],
                    where: {
                        senderId: maladId,
                        senderType: "malad",
                        receiverType: "doctor",
                    },
                    order: [["createdAt", "DESC"]],
                    limit: 1,
                    required: false, // This allows rooms with no messages
                },
            ],
        });

        // Format the data to include the latest message
        const chatList = rooms.map((room) => {
            const latestMessage = room.Messages[0] || {}; // Get the latest message or an empty object if no messages
            return {
                ...room.toJSON(),
                lastMessage: latestMessage || "No messages yet",
            };
        });

        res.status(200).json({ rooms: chatList });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while retrieving chat rooms.",
        });
    }
};

const get_Doctor_Rooms = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        // Fetch the rooms that the doctor is part of, including the latest message for each room
        const rooms = await MessagesRoom.findAll({
            where: {
                doctorId: doctorId,
            },
            include: [
                {
                    model: Doctor,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Malad,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Messages,
                    // attributes: ["message"],
                    where: {
                        receiverId: doctorId,
                        receiverType: "doctor",
                        senderType: "malad",
                    },
                    order: [["createdAt", "DESC"]],
                    limit: 1,
                    required: false, // This allows rooms with no messages
                },
            ],
        });

        // Format the data to include the latest message
        const chatList = rooms.map((room) => {
            const latestMessage = room.Messages[0] || {}; // Get the latest message or an empty object if no messages
            return {
                ...room.toJSON(),
                lastMessage: latestMessage || "No messages yet",
            };
        });

        res.status(200).json({ rooms: chatList });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while retrieving chat rooms.",
        });
    }
};
const fetchMessages = async (roomId) => {
    return await Messages.findAll({
        where: {
            roomId,
        },
        order: [["createdAt", "ASC"]],
        include: [
            {
                model: Malad,
                as: "maladSender",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Doctor,
                as: "doctorSender",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Malad,
                as: "maladReceiver",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Doctor,
                as: "doctorReceiver",
                attributes: ["id", "firstName", "lastName"],
            },
        ],
    });
};

const get_Malad_ChatRoom = async (req, res) => {
    try {
        const { maladId, roomId } = req.params;
        if (isNaN(maladId) || isNaN(roomId)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        
        // Fetch the messages in the room
        const messages = await fetchMessages(roomId);

        await MessagesRoom.update(
            { maladUnreadMessages: 0 },
            { where: { id: roomId, maladId } }
        );
        const room = await MessagesRoom.findOne({
            where: {
                id: roomId,
            },
            include: [
                {
                    model: Doctor,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Malad,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
            ],
        });
        res.status(200).json({ messages, room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const get_Doctor_ChatRoom = async (req, res) => {
    try {
        const { doctorId, roomId } = req.params;
        if (isNaN(doctorId) || isNaN(roomId)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        // Fetch the messages in the room
        const messages = await fetchMessages(roomId);

        await MessagesRoom.update(
            { doctorUnreadMessages: 0 },
            { where: { id: roomId, doctorId } }
        );
        const room = await MessagesRoom.findOne({
            where: {
                id: roomId,
            },
            include: [
                {
                    model: Doctor,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Malad,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
            ],
        });
        res.status(200).json({ messages, room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const post_Malad_Message = async (req, res) => {
    try {
        const { maladId, roomId } = req.params;
        let { message } = req.body;
        const { doctorId } = req.body;
        // Validate message
        if (!message || !doctorId || !roomId || !maladId) {
            return res.status(400).json({ error: "messing data" });
        } else if (isNaN(maladId) || isNaN(doctorId) || isNaN(roomId)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        message = message.trim();
        if (message.length === 0) {
            return res.status(400).json({ error: "Message cannot be empty" });
        }
        const malad = await Malad.findByPk(maladId);
        if (!malad) {
            return res.status(404).json({ error: "Malad not found" });
        }
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        message = message.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
        message = message.replace(/\n+/g, " "); // Replace multiple newline characters with a single space
        message = message.replace(/\s+/g, " ").trim(); // Replace multiple spaces with a single space and trim again

        const newMessage = await Messages.create({
            message,
            senderId: maladId,
            receiverId: doctorId,
            senderType: "malad",
            receiverType: "doctor",
            roomId,
        });

        await MessagesRoom.update(
            {
                doctorUnreadMessages: Sequelize.literal(
                    "doctorUnreadMessages + 1"
                ),
            },
            { where: { id: roomId } }
        );

        res.status(200).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const post_Doctor_Message = async (req, res) => {
    try {
        const { doctorId, roomId } = req.params;
        const { maladId } = req.body;
        let message = req.body.message;
        // Validate message
        if (!message || !maladId || !doctorId || !roomId) {
            return res.status(400).json({ error: "messing data" });
        } else if (isNaN(maladId) || isNaN(doctorId) || isNaN(roomId)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        message = message.trim();
        if (message.length === 0) {
            return res.status(400).json({ error: "Message cannot be empty" });
        }
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        const malad = await Malad.findByPk(maladId);
        if (!malad) {
            return res.status(404).json({ error: "Malad not found" });
        }
        message = message.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
        message = message.replace(/\n+/g, " "); // Replace multiple newline characters with a single space
        message = message.replace(/\s+/g, " ").trim(); // Replace multiple spaces with a single space and trim again

        const newMessage = await Messages.create({
            message,
            senderId: doctorId,
            receiverId: maladId,
            senderType: "doctor",
            receiverType: "malad",
            roomId,
        });

        await MessagesRoom.update(
            {
                maladUnreadMessages: Sequelize.literal(
                    "maladUnreadMessages + 1"
                ),
            },
            { where: { id: roomId } }
        );

        res.status(200).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    get_Malad_Rooms,
    get_Doctor_Rooms,
    get_Malad_ChatRoom,
    get_Doctor_ChatRoom,
    post_Malad_Message,
    post_Doctor_Message,
};
