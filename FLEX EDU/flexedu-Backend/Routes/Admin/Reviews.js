const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin");

const Reviews = require("../../Models/Review_Course"); // Done
const Review_Summary = require("../../Models/Review_Summary"); // Done

router.delete("/Summaries/:reviewId", adminMiddleware, async (req, res) => {
    const reviewId = req.params.reviewId;
    if (!reviewId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing reviewId" });
    try {
        const review = await Review_Summary.findOne({
            where: {
                id: reviewId,
            },
        });
        if (review) await review.destroy();
        return res.status(200).json({ message: "review deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.delete("/Courses/:reviewId", adminMiddleware, async (req, res) => {
    const reviewId = req.params.reviewId;
    if (!reviewId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing reviewId" });
    try {
        const review = await Reviews.findOne({
            where: {
                id: reviewId,
            },
        });
        if (review) await review.destroy();
        return res.status(200).json({ message: "review deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
