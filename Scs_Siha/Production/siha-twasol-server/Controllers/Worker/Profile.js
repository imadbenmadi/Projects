const { Worker } = require("../../Models/Worker");
const { Company } = require("../../Models/Company");
const getProfile = async (req, res) => {
    try {
        const user = await Worker.findByPk(req.decoded.userId, {
            include: [
                {
                    model: Company,
                    as: "Company",
                    attributes: { exclude: ["password"] },
                },
            ],
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        return res.status(200).json({ User: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        const user = await Worker.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        await user.update(newData);

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { EditeProfile, getProfile };
