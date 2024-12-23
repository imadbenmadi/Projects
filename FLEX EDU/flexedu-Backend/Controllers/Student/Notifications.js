// const  Teachers  = require("../../Models/Teacher");
const { Student_Notifications } = require("../../Models/Notifications");
const GetNotifications = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const notifications = await Student_Notifications.findAll({
            where: {
                StudentId: userId,
            },
            order: [["createdAt", "DESC"]],
        });
        // if (!notifications)
        //     return res.status(404).json({ error: "No notifications found." });
        return res.status(200).json({ Notifications: notifications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const DeleteNotification = async (req, res) => {
    const userId = req.decoded.userId;
    const notificationId = req.params.notificationId;
    if (!userId || !notificationId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or notificationId" });
    try {
        const notification = await Student_Notifications.findOne({
            where: {
                id: notificationId,
                StudentId: userId,
            },
        });
        if (!notification)
            return res.status(404).json({ error: "Notification not found." });
        await notification.destroy();
        return res.status(200).json({ message: "Notification deleted." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { GetNotifications, DeleteNotification };
