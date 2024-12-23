// const { Clients } = require("../../Models/Client");

const { Rejection_Resons } = require("../../../Models/Rejection_Resons");
const GetRejections = async (req, res) => {
    const userId = req.decoded.userId;
    const projectId = req.params.projectId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const rejection = await Rejection_Resons.findAll({
            where: {
                ClientId: userId,
                ProjectId: projectId,
            },
            order: [["createdAt", "DESC"]],
        });
        return res.status(200).json({ Rejection_Resons: rejection });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { GetRejections };
