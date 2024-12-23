const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin_middleware");
const { Contact_Messages } = require("../../Models/Contact_Messages");

router.get("/", adminMiddleware, async (req, res) => {
    try {
        const Messages = await Contact_Messages.findAll({
            where: {},
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ Messages });
    } catch (err) {
        console.error("Error fetching Messages:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/:id", adminMiddleware, async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    const messageId = req.params.id;
    if (!messageId)
        return res.status(409).json({ message: "message id is required" });
    try {
        const message = await Contact_Messages.findOne({
            where: { id: messageId },
        });
        if (!message)
            return res
                .status(404)
                .json({ message: "message not found in database " });
        await Contact_Messages.destroy({ where: { id: messageId } });
        res.status(200).json({ message: "message deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting Messages:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
