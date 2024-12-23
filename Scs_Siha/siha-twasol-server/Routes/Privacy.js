const express = require("express");
const router = express.Router();
const { Privacy } = require("../Models/Privacy");
const Admin_Midllware = require("../Middlewares/Admin_middleware");
const Handle_Edit_Privacy = async (req, res) => {
    try {
        const { Content } = req.body;
        if (!Content) {
            return res
                .status(409)
                .json({ message: "Missing Data , Content is required" });
        }
        await Privacy.destroy({ where: {} });
        await Privacy.create({
            Content,
        });
        return res.status(200).json({
            message: "Privacy Changed Successfully ",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
router.put("/", Admin_Midllware, Handle_Edit_Privacy);
router.get("/", async (req, res) => {
    try {
        const privacy = await Privacy.findOne();
        if (!privacy) {
            return res.status(404).json({ message: "No content found" });
        }
        return res.status(200).json(privacy);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
});
module.exports = router;
