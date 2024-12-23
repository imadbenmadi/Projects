// const { Clients } = require("../../Models/Client");
const { Projects } = require("../../Models/Project");
const { Client_Feedbacks } = require("../../Models/Feedbacks");
const { Freelancers } = require("../../Models/Freelnacer");
const RateFreealncer = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    const freelancerId = req.params.freelancerId;
    const { Rate, Comment, ProjectId } = req.body;
    if (!Rate || !Comment || !ProjectId || !freelancerId)
        return res
            .status(400)
            .json({ error: "Please provide all required fields." });
    try {
        const project = await Projects.findByPk(ProjectId);
        if (!project)
            return res.status(404).json({ error: "Project not found." });
        if (project.ClientId !== userId)
            return res.status(409).json({
                error: "Unauthorized , you are not the owner of this project",
            });
        if (project.FreelancerId != freelancerId)
            return res.status(409).json({
                error: "Unauthorized , this freelancer is not working on this project",
            });
        if (project.isCleint_send_Feedback)
            return res.status(409).json({
                error: "Unauthorized ,Client  alredy Rate this Freelancer",
            });
        const freelancer = await Freelancers.findByPk(project.FreelancerId);
        if (!freelancer)
            return res.status(404).json({ error: "freelancer not found." });
        const newRate = (freelancer.Rate + Rate) / 2;
        await Freelancers.update(
            { Rate: newRate },
            { where: { id: project.FreelancerId } }
        );
        const Feedback = await Client_Feedbacks.create({
            FreelancerId: freelancerId,
            ClientId: userId,
            Rate,
            Comment,
            ProjectId,
        });
        await project.update(
            {
                isCleint_send_Feedback: true,
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

module.exports = { RateFreealncer };
