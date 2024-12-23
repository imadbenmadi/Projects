const { Malad } = require("../../../Models/Malad");
const { Company } = require("../../../Models/Company");

const openChatRoom = async (req, res) => {
    const { maladId } = req.params;
    if (!maladId) {
        return res.status(400).json({ message: "maladId is required." });
    }

    try {
        const malad = await Malad.findOne({
            where: { id: maladId },
            include: [{ model: Company }],
        });
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }
        return res.status(200).json({ malad });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const delete_chatRoom = async (req, res) => {
    const { maladId } = req.params;
    if (!maladId) {
        return res.status(400).json({ message: "maladId is required." });
    }

    try {
        const malad = await Malad.findOne({
            where: { id: maladId },
            include: [{ model: Company }],
        });
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }
        return res.status(200).json({ malad });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    openChatRoom,
    delete_chatRoom,
};
