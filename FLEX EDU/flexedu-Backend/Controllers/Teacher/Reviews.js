
const Reviews = require("../../Models/Review_Course"); // Done
const Review_Summary = require("../../Models/Review_Summary"); // Done

const Delete_course_review = async (req, res) => {
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
};
const Delete_summary_review = async (req, res) => {
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
};
module.exports = { Delete_course_review, Delete_summary_review };
