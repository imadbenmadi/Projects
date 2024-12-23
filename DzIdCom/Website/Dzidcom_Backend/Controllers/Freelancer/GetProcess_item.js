// const { Clients } = require("../../Models/Client");
const { Op } = require("sequelize");

const { Projects } = require("../../Models/Project");
const GetProcess_item = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const project = await Projects.findOne({
            where: {
                id: projectId,
                FreelancerId: userId,
                status: {
                    [Op.in]: ["Payed", "Completed", "Accepted"],
                },
            },
        });
        if (!project)
            return res.status(404).json({ error: "Project not found." });

        return res.status(200).json({ Project: project });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { GetProcess_item };
