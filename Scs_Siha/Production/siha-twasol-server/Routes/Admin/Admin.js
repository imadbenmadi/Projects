const express = require("express");
const router = express.Router();
const { Admins } = require("../../Models/Admin/Admin");

const Admin_midllware = require("../../Middlewares/Admin_middleware");
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
// router.use("/Projects", require("./Projects"));
// router.use("/Applications", require("./Applications"));
// router.use("/Payment", require("./Payment"));
router.use("/Home", require("./Home"));
// router.use("/Feedbacks", require("./Feedbacks"));
router.use("/Companies", require("./Companies"));
router.use("/Contact", require("./Contact"));
router.use("/Users", require("./Users"));
module.exports = router;
