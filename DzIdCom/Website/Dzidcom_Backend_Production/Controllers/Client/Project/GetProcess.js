// const { Clients } = require("../../Models/Client");
const { Clients } = require("../../../Models/Client");
const { Freelancers } = require("../../../Models/Freelnacer");
const { Projects } = require("../../../Models/Project");
const GetProcess = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const projects = await Projects.findAll({
            where: {
                ClientId: userId,
                status: "Payed",
            },
        });
        return res.status(200).json({ Projects: projects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { GetProcess };
