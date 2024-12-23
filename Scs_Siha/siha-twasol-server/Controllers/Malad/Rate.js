const { Malad } = require("../../Models/Malad");
const { Doctor } = require("../../Models/Doctor");
const { Doctor_Malads } = require("../../Models/Doctor");
const {  Doctor_Rates } = require("../../Models/Rates");
const rate_Doctor = async (req, res) => {
    const { doctorId } = req.params;
    const { rating, review } = req.body;
    if (!doctorId || !rating) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const malad = await Malad.findByPk(doctorId);
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }
        const user = await Doctor.findByPk(req.decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const alreadyRated = await Doctor_Rates.findOne({
            where: { maladId: req.decoded.userId, doctorId },
        });

        if (alreadyRated) {
            return res.status(400).json({ message: "Malad already rated." });
        }
        const is_in_List = await Doctor_Malads.findOne({
            where: {
                doctorId,
                maladId: req.decoded.userId,
            },
        });
        if (!is_in_List) {
            return res
                .status(400)
                .json({ message: "You are not in the list." });
        }
        await Doctor_Rates.create({
            maladId: req.decoded.userId,
            doctorId,
            Rate: rating,
            review,
        });
        return res.status(200).json({ message: "Rating added successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    rate_Doctor,
};
