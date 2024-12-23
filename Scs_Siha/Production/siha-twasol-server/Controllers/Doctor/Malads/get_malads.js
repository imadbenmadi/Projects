const { Malad } = require("../../../Models/Malad");
const { Doctor } = require("../../../Models/Doctor");
const { Doctor_Malads } = require("../../../Models/Doctor");
const { Malad_Rates } = require("../../../Models/Rates");
const { Malad_Files } = require("../../../Models/Malad_Files");
const { Op } = require("sequelize");
// Get all malads
const get_All = async (req, res) => {
    try {
        const ownedMaladIds = await Doctor_Malads.findAll({
            where: { doctorId: req.params.userId },
            // attributes: ["maladId"],
            raw: true,
        }).then((results) => results.map((item) => item.maladId));

        const malads = await Malad.findAll({
            where: {
                id: {
                    [Op.notIn]: ownedMaladIds, // ownedMaladIds should be an array
                },
            },
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({ malads });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get an malad by ID
const get_by_id = async (req, res) => {
    const { maladId } = req.params;
    if (!maladId) {
        return res.status(400).json({ message: "maladId is required." });
    }

    try {
        const malad = await Malad.findOne({
            where: { id: maladId },
        });
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }
        const is_in_list = await Doctor_Malads.findOne({
            where: { doctorId: req.params.userId, maladId },
        });
        const maladrates = await Malad_Rates.findAll({
            where: { maladId },
            include: [
                {
                    model: Doctor,
                    attributes: { exclude: ["password"] }, // Exclude sensitive fields
                },
                {
                    model: Malad,
                    attributes: { exclude: ["password"] }, // Exclude sensitive fields
                },
            ],
        });
        return res.status(200).json({ malad, is_in_list, maladrates });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const get_own_malads = async (req, res) => {
    try {
        const malads = await Doctor_Malads.findAll({
            where: { doctorId: req.params.userId },
            include: [
                {
                    model: Malad,
                },

                // {
                //     model: Doctor,
                // },
            ],
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({ malads });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const get_own_malad_by_id = async (req, res) => {
    const { maladId } = req.params;
    if (!maladId) {
        return res.status(400).json({ message: "maladId is required." });
    }

    try {
        const malad = await Doctor_Malads.findOne({
            where: { doctorId: req.params.userId, maladId },
            include: [
                {
                    model: Malad,
                },
            ],
        });
        const malad_files = await Malad_Files.findAll({
            where: { maladId: maladId },
        });
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }
        const is_rated = await Malad_Rates.findOne({
            where: { doctorId: req.params.userId, maladId },
        });
        const maladrates = await Malad_Rates.findAll({
            where: { maladId },
            include: [
                {
                    model: Doctor,
                    attributes: { exclude: ["password"] }, // Exclude sensitive fields
                },
                {
                    model: Malad,
                    attributes: { exclude: ["password"] }, // Exclude sensitive fields
                },
            ],
        });
        return res
            .status(200)
            .json({ malad, is_rated, maladrates, malad_files });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    get_All,
    get_by_id,
    get_own_malads,
    get_own_malad_by_id,
};
