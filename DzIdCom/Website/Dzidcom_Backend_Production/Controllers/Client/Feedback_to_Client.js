// const { Clients } = require("../../Models/Client");
const { Projects } = require("../../Models/Project");
const { Freelancer_Feedbacks } = require("../../Models/Feedbacks");
const { Clients } = require("../../Models/Client");
const RateClient = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    const clientId = req.params.clientId;
    const { Rate, Comment, ProjectId } = req.body;
    if (!Rate || !Comment || !ProjectId || !clientId)
        return res
            .status(400)
            .json({ error: "Please provide all required fields." });

    try {
        const project = await Projects.findByPk(ProjectId);
        if (!project)
            return res.status(404).json({ error: "Project not found." });
        if (project.FreelancerId !== userId)
            return res.status(409).json({
                error: "Unauthorized , you are not the freelancer of this project",
            });
        if (project.ClientId != clientId)
            return res.status(409).json({
                error: "Unauthorized , this Client is not the owner of this project",
            });
        if (project.isFreelancer_send_Feedback)
            return res.status(409).json({
                error: "Unauthorized , Freelancer alredy Rate this Client",
            });
        const Feedback = await Freelancer_Feedbacks.create({
            FreelancerId: userId,
            ClientId: clientId,
            Rate,
            Comment,
            ProjectId,
        });
        const Client = await Clients.findByPk(project.ClientId);
        if (!Client)
            return res.status(404).json({ error: "Client not found." });
        const newRate = (Client.Rate + Rate) / 2;
        await Clients.update(
            { Rate: newRate },
            { where: { id: project.ClientId } }
        );
        await project.update(
            {
                isFreelancer_send_Feedback: true,
                isWorkUploaded: true,
                status: "Completed",
            },
            {
                where: {
                    id: ProjectId,
                    ClientId: project.ClientId,
                    FreelancerId: project.FreelancerId,
                },
            }
        );
        return res
            .status(200)
            .json({ message: "Feedback Created successfully", Feedback });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { RateClient };
