const express = require("express");
const router = express.Router();
const Admin_midllware = require("../../Middlewares/Admin_middleware");

const { Malad } = require("../../Models/Malad");
const { Doctor } = require("../../Models/Doctor");
const { Company } = require("../../Models/Company");
router.get("/", Admin_midllware, async (req, res) => {
    try {
        let Malad_nbr = await Malad.count({
            where: {},
        });
        let Doctor_nbr = await Doctor.count({
            where: {},
        });
        let Company_nbr = await Company.count({
            where: {},
        });
        let Malads = await Malad.findAll({
            where: {},
        });
        let Doctors = await Doctor.findAll({
            where: {},
        });
        let Companies = await Company.findAll({
            where: {},
        });
        if (!Malad_nbr) Malad_nbr = 0;
        if (!Doctor_nbr) Doctor_nbr = 0;
        if (!Company_nbr) Company_nbr = 0;
        res.status(200).json({
            Malad_nbr: Malad_nbr,
            Doctor_nbr: Doctor_nbr,
            Company_nbr: Company_nbr,
            Malads: Malads,
            Doctors: Doctors,
            Companies: Companies,
        });
    } catch (err) {
        console.error("Error fetching Home page:", err);
        res.status(500).json({ message: err });
    }
});

module.exports = router;
