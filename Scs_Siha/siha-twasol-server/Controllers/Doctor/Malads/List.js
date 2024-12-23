const { Malad } = require("../../../Models/Malad");
const { Doctor } = require("../../../Models/Doctor");
const { Doctor_Malads } = require("../../../Models/Doctor");
const { MessagesRoom } = require("../../../Models/Messages");
const { Messages } = require("../../../Models/Messages");
const { Malad_Files } = require("../../../Models/Malad_Files");
const fs = require("fs");
const { Malad_Notifications } = require("../../../Models/Notifications");

const add_malads_to_list = async (req, res) => {
    const { maladId, userId } = req.params;

    // Validate input
    if (!maladId || !userId) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const malad = await Malad.findByPk(maladId);
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }

        const doctor = await Doctor.findByPk(userId);
        if (!doctor) {
            return res.status(404).json({ message: "User not found." });
        }

        const alreadyAdded = await Doctor_Malads.findOne({
            where: { maladId, doctorId: userId },
        });
        if (alreadyAdded) {
            return res.status(400).json({ message: "Malad already added." });
        }

        await Doctor_Malads.create({ maladId, doctorId: userId });

        const existingRoom = await MessagesRoom.findOne({
            where: {
                maladId: maladId,
                doctorId: userId,
            },
        });

        let newRoom;
        if (!existingRoom) {
            newRoom = await MessagesRoom.create({
                maladId: maladId,
                doctorId: userId,
            });
        }

        await Malad_Notifications.create({
            maladId,
            title: "الدكتور أضافك إلى قائمته",
            text: `الدكتور ${doctor.firstName} ${doctor.lastName} أضافك إلى قائمته.`,
            link: `/Malad/Companies/${doctor.companyId}/Doctors/${doctor.id}`,
        });
        // Return success response
        return res.status(200).json({
            message: "Malad added and chat room created successfully.",
            ChatRoom: newRoom,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const remove_malad_from_list = async (req, res) => {
    const { maladId } = req.params;
    const { userId } = req.params;

    // Validate input
    if (!maladId || !userId) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const malad = await Malad.findByPk(maladId);
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }

        const user = await Doctor.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const chatRoom = await MessagesRoom.findOne({
            where: { maladId, doctorId: userId },
        });

        if (chatRoom) {
            await Messages.destroy({
                where: { roomId: chatRoom.id },
            });

            await MessagesRoom.destroy({
                where: { id: chatRoom.id },
            });
        }
        // Delete files related to malad
        const malad_Files = await Malad_Files.findAll({
            where: { maladId, doctorId: userId },
        });
        if (malad_Files && malad_Files.length > 0) {
            malad_Files.forEach(async (file) => {
                const previousFilename = file?.file_link.split("/").pop();
                const previousImagePath = `public/Malads_Files/${previousFilename}`;
                try {
                    if (fs.existsSync(previousImagePath)) {
                        fs.unlinkSync(previousImagePath);
                    }
                } catch (error) {
                    console.error(error);
                    // return res.status(400).send({
                    //     message:
                    //         "Could not delete Event picture : " + error.message,
                    // });
                }
                await file.destroy();
            });
        }
        await Doctor_Malads.destroy({
            where: { maladId, doctorId: userId },
        });
        return res.status(200).json({ message: "Malad removed successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    add_malads_to_list,
    remove_malad_from_list,
};
