const express = require("express");
const router = express.Router();
const Admin_midllware = require("../../Middlewares/Admin");

const Students = require("../../Models/Student");
const Teachers = require("../../Models/Teacher");
const Courses = require("../../Models/Course");
router.get("/", Admin_midllware, async (req, res) => {
    try {
        let Students_nbr = await Students.count({
            where: {},
        });
        let Teachers_nbr = await Teachers.count({
            where: {},
        });
        let courses_nbr = await Courses.count({
            where: {
                // status: {
                //     [Op.in]: ["Accepted", "Payed", "Completed"],
                // },
            },
        });
        // let payments = await Courses.count({
        //     where: { status: "Payed" },
        // });
        // let applications = await Applications.count({
        //     where: {},
        // });
        let students = await Students.findAll({
            where: {},
        });
        let teachers = await Teachers.findAll({
            where: {},
        });
        let courses = await Courses.findAll({
            where: {
                // status: {
                //     [Op.in]: ["Accepted", "Payed", "Completed"],
                // },
            },
        });
        if (!Students_nbr) Students_nbr = 0;
        if (!Teachers_nbr) Teachers_nbr = 0;
        if (!courses_nbr) courses_nbr = 0;
        res.status(200).json({
            Students_nbr: Students_nbr,
            Teachers_nbr: Teachers_nbr,
            courses_nbr: courses_nbr,
            Students: students,
            Teachers: teachers,
            courses: courses,
        });
    } catch (err) {
        console.error("Error fetching Course Applications:", err);
        res.status(500).json({ message: err });
    }
});

module.exports = router;
