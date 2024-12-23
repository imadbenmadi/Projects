// const { Clients } = require("../../Models/Client");
const { Projects } = require("../../../Models/Project");
const AddProject = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        // Find the Client by their ID
        // const Client = await Clients.findByPk(userId);
        // if (!Client) {
        //     return res.status(404).json({ error: "Client not found." });
        // }
        const {
            Title,
            Description,
            Field_is_Graphic_design,
            Field_is_Content_creation,
            Field_is_SEO_SIM,
            Expected_Time,
            Client_Budget,
            Frelancer_Experiance,
        } = req.body;

        if (!Title || !Description) {
            return res
                .status(400)
                .json({ error: "Please provide all required fields." });
        } else if (
            (Field_is_Graphic_design &&
                typeof Field_is_Graphic_design !== "boolean") ||
            (Field_is_Content_creation &&
                typeof Field_is_Content_creation !== "boolean") ||
            (Field_is_SEO_SIM && typeof Field_is_SEO_SIM !== "boolean")
        ) {
            return res.status(400).json({ error: "invalide type " });
        }
        await Projects.create({
            ClientId: userId,
            Title,
            Description,
            Field_is_Graphic_design: !!Field_is_Graphic_design,
            Field_is_Content_creation: !!Field_is_Content_creation,
            Field_is_SEO_SIM: !!Field_is_SEO_SIM,
            Expected_Time,
            Client_Budget,
            Frelancer_Experiance,
        });
        return res.status(200).json({ message: "Projcet added successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { AddProject };
