const { Clients } = require("../../../Models/Client");
const getProfile = async (req, res) => {
    const userId = req.decoded.userId;
    try {
        const user_in_db = await Clients.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        if (!user_in_db) {
            return res.status(404).json({ error: "user not found." });
        }
        return res.status(200).json({ User: user_in_db });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};

module.exports = { getProfile };
