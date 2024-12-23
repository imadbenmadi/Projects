const { Director } = require("../../Models/Director");

const getProfile = async (req, res) => {
    const userId = req.decoded.userId;
    try {
        const user = await Director.findByPk(userId, {
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
module.exports = { getProfile };
