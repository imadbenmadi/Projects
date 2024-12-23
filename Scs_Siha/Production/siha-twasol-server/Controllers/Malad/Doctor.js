const { Company } = require("../../Models/Company");
const { Doctor, Doctor_Malads } = require("../../Models/Doctor");
const { Doctor_Rates } = require("../../Models/Rates");
const { Malad } = require("../../Models/Malad");
const get_Doctor = async (req, res) => {
    if (!req.params.doctorId) {
        return res.status(400).json({ message: "Doctor ID is required." });
    }

    try {
        // Fetch the doctor with services and doctors
        const doctor = await Doctor.findByPk(req.params.doctorId, {
            include: [{ model: Company }],
        });
        const List_cheker = await Doctor_Malads.findOne({
            where: {
                doctorId: req.params.doctorId,
                maladId: req.decoded.userId,
            },
        });
        const is_in_List = List_cheker ? true : false;
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found." });
        }
        const doctorRates = await Doctor_Rates.findAll({
            where: { doctorId: doctor.id },
            include: [
                {
                    model: Malad,
                    attributes: { exclude: ["password"] },
                },
            ],
        });
        const Rated_Check = await Doctor_Rates.findOne({
            where: { doctorId: doctor.id, maladId: req.decoded.userId },
        });
        const is_rated = Rated_Check ? true : false;
        res.status(200).json({ doctor, is_rated, is_in_List, doctorRates });
    } catch (error) {
        console.error("Failed to fetch doctor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { get_Doctor };
