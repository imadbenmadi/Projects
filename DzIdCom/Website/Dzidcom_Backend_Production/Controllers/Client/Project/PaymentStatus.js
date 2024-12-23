// const { Clients } = require("../../Models/Client");
const { Clients } = require("../../../Models/Client");
const { Freelancers } = require("../../../Models/Freelnacer");
const { Projects } = require("../../../Models/Project");
const PaymentStatus = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const project = await Projects.findOne({
            where: {
                id: projectId,
                ClientId: userId,
            },
            // include: [
            //     {
            //         model: Freelancers,
            //         as: "freelancer",
            //         required: false,
            //     },
            //     {
            //         model: Clients,
            //         as: "owner",
            //     },
            // ],
        });
        let Payment_Authorization = false;
        let only_see = false;
        if (
            project.status === "Accepted" &&
            project.FreelancerId &&
            ((project.isPayment_ScreenShot_Rejected &&
                project.isPayment_ScreenShot_uploaded) ||
                (!project.isPayment_ScreenShot_Rejected &&
                    !project.isPayment_ScreenShot_uploaded))
        ) {
            Payment_Authorization = true;
        } else Payment_Authorization = false;

        if (
            project.isPayment_ScreenShot_uploaded &&
            !project.isPayment_ScreenShot_Rejected
        ) {
            only_see = true;
        } else only_see = false;

        return res
            .status(200)
            .json({ Project: project, Payment_Authorization, only_see });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { PaymentStatus };
