const Courses = require("../../Models/Course");
const Students = require("../../Models/Student");
const Course_Progress = require("../../Models/Course_Progress");

const Reviews = require("../../Models/Review_Course");
const Review_Summary = require("../../Models/Review_Summary");
const Summary = require("../../Models/Summary");
const post_course_review = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    const { rating, review } = req.body;
    if (!userId || !courseId || !rating || !review)
        return res.status(409).json({
            error: "Unauthorized , missing userId or courseId or rating or review",
        });
    try {
        const student = await Students.findOne({
            where: {
                id: userId,
            },
        });
        if (!student)
            return res.status(404).json({ error: "Student not found." });
        const course = await Courses.findOne({
            where: {
                id: courseId,
            },
        });
        if (!course)
            return res.status(404).json({ error: "Course not found." });
        const course_progress = await Course_Progress.findOne({
            where: {
                StudentId: userId,
                CourseId: courseId,
            },
        });
        if (!course_progress)
            return res.status(404).json({ error: "Course not found." });
        const already_reviewed = await Reviews.findOne({
            where: {
                StudentId: userId,
                CourseId: courseId,
            },
        });
        if (already_reviewed)
            return res.status(404).json({ error: "Review already exists." });

        const review_data = await Reviews.create({
            StudentId: userId,
            CourseId: courseId,
            Rate: rating,
            Comment: review,
        });
        await course.update({
            Rate: (course.Rate + rating) / 2,
        });
        if (!review_data)
            return res.status(404).json({ error: "Review not created." });
        return res.status(200).json({ Review: review_data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const post_summary_review = async (req, res) => {
    const userId = req.decoded.userId;
    const summaryId = req.params.summaryId;
    const { rating, review } = req.body;
    if (!userId || !summaryId || !rating || !review)
        return res.status(409).json({
            error: "Unauthorized , missing userId or summaryId or rating or review",
        });
    try {
        const student = await Students.findOne({
            where: {
                id: userId,
            },
        });
        if (!student)
            return res.status(404).json({ error: "Student not found." });
        const summary = await Summary.findOne({
            where: {
                id: summaryId,
            },
        });
        if (!summary)
            return res.status(404).json({ error: "Summary not found." });
        // const already_reviewed = await Review_Summary.findOne({
        //     where: {
        //         StudentId: userId,
        //         SummaryId: summaryId,
        //     },
        // });
        // if (already_reviewed)
        //     return res.status(404).json({ error: "Review already exists." });

        const review_data = await Review_Summary.create({
            StudentId: userId,
            SummaryId: summaryId,
            Rate: rating,
            Comment: review,
        });
        await summary.update({
            Rate: (summary.Rate + rating) / 2,
        });
        if (!review_data)
            return res.status(404).json({ error: "Review not created." });
        return res.status(200).json({ Review: review_data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    post_course_review,
    post_summary_review,
};
