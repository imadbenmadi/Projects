// const { Clients } = require("../../Models/Client");

const { Projects } = require("../../Models/Project");
const { Op } = require("sequelize");
const GetProcess = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const projects = await Projects.findAll({
            where: {
                FreelancerId: userId,
                status: {
                    [Op.in]: ["Payed", "Completed", "Accepted"],
                },
            },
            order: [["createdAt", "DESC"]],
        });
        return res.status(200).json({ Projects: projects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { GetProcess };
