const { Freelancer_Feedbacks } = require("../../Models/Feedbacks");
const { Freelancers } = require("../../Models/Freelnacer");
const { Clients } = require("../../Models/Client");
const GetFeedbacks = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const Feedbacks = await Freelancer_Feedbacks.findAll({
            where: {
                ClientId: userId,
            },
            include: [
                { model: Freelancers, as: "Freelancer" },
                { model: Clients, as: "Client" },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!Feedbacks)
            return res.status(404).json({ error: "No Feedbacks found." });
        return res.status(200).json({ Feedbacks: Feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { GetFeedbacks };
