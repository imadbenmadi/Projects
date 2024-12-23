const express = require("express");
const router = express.Router();
const Admins = require("../../Models/Admin/Admin");

const Admin_midllware = require("../../Middlewares/Admin");
router.get("/Admins", Admin_midllware, async (req, res) => {
    try {
        const admins = await Admins.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(admins);
    } catch (err) {
        console.error("Error fetching Admins:", err);
        res.status(500).json({ message: err });
    }
});
router.use("/Courses", require("./Courses"));
router.use("/Summaries", require("./Summaries"));
router.use("/Payment", require("./Payment"));
router.use("/Home", require("./Home"));
router.use("/Contact", require("./Contact"));
router.use("/Users", require("./Users"));
router.use("/upload", require("./Uploads/Upload"));
router.use("/Reviews", require("./Reviews"));
module.exports = router;
