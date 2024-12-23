const express = require("express");
const router = express.Router();
const Courses = require("../../Models/Course");
const Summary = require("../../Models/Summary");
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests");
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");
const Course_Progress = require("../../Models/Course_Progress");
const Students = require("../../Models/Student");
const Admin_midllware = require("../../Middlewares/Admin");
const { Op } = require("sequelize");
const sequelize = require("../../config/db_connection");
const {
    Student_Notifications,
    Teacher_Notifications,
} = require("../../Models/Notifications");
router.get("/Courses", Admin_midllware, async (req, res) => {
    try {
        const courses_Purcase_Requests = await Course_Purcase_Requests.findAll({
            where: {
                StudentId: { [Op.not]: null },
                status: "pending",
            },
            include: [{ model: Students }, { model: Courses }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({
            courses_Purcase_Requests: courses_Purcase_Requests,
        });
    } catch (err) {
        console.error("Error fetching Course courses:", err);
        res.status(500).json({ message: err });
    }
});

router.get("/Courses/Accepted", Admin_midllware, async (req, res) => {
    try {
        const course_Purcase_Requests = await Course_Purcase_Requests.findAll({
            // where: { status: "Pending" },
            // where: { isPayment_ScreenShot_uploaded: true },
            where: {
                StudentId: { [Op.not]: null },
                status: "accepted",
            },
            include: [{ model: Students }, { model: Courses }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({
            course_Purcase_Requests: course_Purcase_Requests,
        });
    } catch (err) {
        console.error("Error fetching Course courses:", err);
        res.status(500).json({ message: err });
    }
});

router.get("/Courses/Rejected", Admin_midllware, async (req, res) => {
    try {
        const course_Purcase_Requests = await Course_Purcase_Requests.findAll({
            where: {
                StudentId: { [Op.not]: null },
                status: "rejected",
            },
            include: [{ model: Students }, { model: Courses }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({
            course_Purcase_Requests: course_Purcase_Requests,
        });
    } catch (err) {
        console.error("Error fetching Course courses:", err);
        res.status(500).json({ message: err });
    }
});
router.get("/Courses/:courseId", Admin_midllware, async (req, res) => {
    const courseId = req.params.courseId;
    if (!courseId)
        return res
            .status(409)
            .json({ message: "Missing data CourseId is required" });

    try {
        const course_Purcase_Requests = await Course_Purcase_Requests.findOne({
            where: {
                id: courseId,
                StudentId: { [Op.not]: null },
            },
            include: [{ model: Students }, { model: Courses }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({
            course_Purcase_Requests: course_Purcase_Requests,
        });
    } catch (err) {
        console.error("Error fetching Course courses:", err);
        res.status(500).json({ message: err });
    }
});
router.get("/Summaries/Accepted", Admin_midllware, async (req, res) => {
    try {
        const summary_Purcase_Requests = await Summary_Purcase_Requests.findAll(
            {
                where: {
                    StudentId: { [Op.not]: null },
                    status: "accepted",
                },
                include: [{ model: Students }, { model: Summary }],
                order: [["createdAt", "DESC"]],
            }
        );

        res.status(200).json({
            summary_Purcase_Requests: summary_Purcase_Requests,
        });
    } catch (err) {
        console.error("Error fetching Summary courses:", err);
        res.status(500).json({ message: err });
    }
});
router.get("/Summaries/Rejected", Admin_midllware, async (req, res) => {
    try {
        const summary_Purcase_Requests = await Summary_Purcase_Requests.findAll(
            {
                where: {
                    StudentId: { [Op.not]: null },
                    status: "rejected",
                },
                include: [{ model: Students }, { model: Summary }],
                order: [["createdAt", "DESC"]],
            }
        );

        res.status(200).json({
            summary_Purcase_Requests: summary_Purcase_Requests,
        });
    } catch (err) {
        console.error("Error fetching Summary courses:", err);
        res.status(500).json({ message: err });
    }
});

router.post("/Courses/:courseId/Accept", Admin_midllware, async (req, res) => {
    const { courseId } = req.params;
    const { studentId } = req.body;

    if (!courseId || !studentId) {
        return res.status(409).json({
            message: "Missing data: CourseId and StudentId are required",
        });
    }

    const t = await sequelize.transaction(); // Start a transaction

    try {
        const course = await Courses.findOne({ where: { id: courseId } });
        const payment_request = await Course_Purcase_Requests.findOne({
            where: { CourseId: courseId, StudentId: studentId },
        });

        if (!course || !payment_request) {
            await t.rollback();
            return res
                .status(404)
                .json({ message: "Course or payment request not found" });
        }

        await payment_request.update(
            { status: "accepted" },
            { transaction: t }
        );
        await course.increment("Students_count", { by: 1, transaction: t });
        await Course_Progress.create(
            {
                StudentId: studentId,
                CourseId: courseId,
                // Course_Videos_number: course.Vedios_count,
            },
            { transaction: t }
        );

        try {
            await Teacher_Notifications.create(
                {
                    title: "Payment received",
                    text: "A new student has paid the fees for your course.",
                    type: "payment_received",
                    TeacherId: course.TeacherId,
                    link: `/Teacher/Payments`,
                },
                { transaction: t }
            );

            await Student_Notifications.create(
                {
                    title: "Your payment has been accepted",
                    text: "You can now access the course content.",
                    type: "payment_accepted",
                    StudentId: studentId,
                    link: `/Student/Purchased`,
                },
                { transaction: t }
            );
        } catch (error) {
            await t.rollback();
            return res
                .status(500)
                .json({ message: "Notification Error", error: error.message });
        }

        await t.commit(); // Commit transaction if all went well
        res.status(200).json({ message: "Course payment accepted" });
    } catch (err) {
        await t.rollback(); // Rollback transaction on error
        console.error("Error processing course payment approval:", err);
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
});
router.post("/Courses/:courseId/Reject", Admin_midllware, async (req, res) => {
    const { courseId } = req.params;
    const { studentId } = req.body; // We need studentId from the request body, same as in Accept

    // Check if courseId and studentId are provided
    if (!courseId || !studentId) {
        return res.status(409).json({
            message: "Missing data: CourseId and StudentId are required",
        });
    }

    // Start a transaction
    const t = await sequelize.transaction();

    try {
        // Find the course and payment request
        const course = await Courses.findOne({
            where: { id: courseId },
            transaction: t,
        });
        const payment_request = await Course_Purcase_Requests.findOne({
            where: { CourseId: courseId, StudentId: studentId },
            transaction: t,
        });

        // Check if the course and payment request exist
        if (!course || !payment_request) {
            await t.rollback(); // Rollback transaction if not found
            return res
                .status(404)
                .json({ message: "Course or payment request not found" });
        }

        // Update the payment request status to rejected
        await payment_request.update(
            { status: "rejected" },
            { transaction: t }
        );

        // Remove the course progress for the student if it exists
        // await Course_Progress.destroy({
        //     where: { CourseId: courseId, StudentId: studentId },
        //     transaction: t,
        // });

        // Send notifications to both teacher and student
        try {
            // Teacher notification

            // Student notification
            await Student_Notifications.create(
                {
                    title: "Your payment has been rejected",
                    text: `Your payment for the course "${course.Title}" has been rejected. Please contact support for more details.`,
                    type: "payment_rejected",
                    StudentId: studentId,
                    link: `/Student/Courses/${course.id}/Enrollment/?rejected=true`,
                },
                { transaction: t }
            );
        } catch (error) {
            await t.rollback(); // Rollback transaction if notification fails
            return res.status(500).json({ error: error.message });
        }

        // Commit the transaction
        await t.commit();

        // Respond with success
        res.status(200).json({
            message: "Course payment rejected successfully",
        });
    } catch (err) {
        // Rollback the transaction in case of an error
        await t.rollback();
        console.error("Error processing course payment rejection:", err);
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
});

router.get("/Summaries", Admin_midllware, async (req, res) => {
    try {
        const summary_Purcase_Requests = await Summary_Purcase_Requests.findAll(
            {
                // where: { status: "Pending" },
                // where: { isPayment_ScreenShot_uploaded: true },
                where: {
                    StudentId: { [Op.not]: null },
                    status: "pending",
                },
                include: [{ model: Students }, { model: Summary }],
                order: [["createdAt", "DESC"]],
            }
        );
        res.status(200).json({
            summary_Purcase_Requests: summary_Purcase_Requests,
        });
    } catch (err) {
        console.error("Error fetching Summary courses:", err);
        res.status(500).json({ message: err });
    }
});
router.get("/Summaries/:summaryId", Admin_midllware, async (req, res) => {
    const summaryId = req.params.summaryId;
    if (!summaryId)
        return res.status(409).json({
            message: "Missing data SummaryId is required",
        });

    try {
        const summary_Purcase_Requests = await Summary_Purcase_Requests.findOne(
            {
                where: {
                    id: summaryId,
                    StudentId: { [Op.not]: null },
                },
                include: [{ model: Students }, { model: Summary }],
                order: [["createdAt", "DESC"]],
            }
        );
        res.status(200).json({
            summary_Purcase_Requests: summary_Purcase_Requests,
        });
    } catch (err) {
        console.error("Error fetching Summary courses:", err);
        res.status(500).json({ message: err });
    }
});

router.post(
    "/Summaries/:summaryId/Accept",
    Admin_midllware,
    async (req, res) => {
        const { summaryId } = req.params;
        const { studentId } = req.body;

        if (!summaryId || !studentId) {
            return res.status(409).json({
                message: "Missing data: SummaryId and StudentId are required",
            });
        }

        const t = await sequelize.transaction(); // Start a transaction

        try {
            const summary = await Summary.findOne({ where: { id: summaryId } });
            const payment_request = await Summary_Purcase_Requests.findOne({
                where: { id: summaryId, StudentId: studentId },
            });
            if (!summary || !payment_request) {
                await t.rollback();
                return res
                    .status(404)
                    .json({ message: "Summary or payment request not found" });
            }
            await payment_request.update(
                { status: "accepted" },
                { transaction: t }
            );
            await summary.increment("Students_count", {
                by: 1,
                transaction: t,
            });
            try {
                await Teacher_Notifications.create(
                    {
                        title: "Payment received",
                        text: "A new student has paid the fees for your Summary.",
                        type: "payment_received",
                        TeacherId: summary.TeacherId,
                        link: `/Teacher/Payments`,
                    },
                    { transaction: t }
                );
                await Student_Notifications.create(
                    {
                        title: "Your payment has been accepted",
                        text: "You can now access the Summary content.",
                        type: "payment_accepted",
                        StudentId: studentId,
                        link: `/Student/Purchased`,
                    },
                    { transaction: t }
                );
            } catch (error) {
                await t.rollback();
                return res.status(500).json({
                    message: "Notification Error",
                    error: error.message,
                });
            }

            await t.commit(); // Commit transaction if all went well
            res.status(200).json({ message: "Summary payment accepted" });
        } catch (err) {
            await t.rollback(); // Rollback transaction on error
            console.error("Error processing Summary payment approval:", err);
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }
);
router.post(
    "/Summaries/:summaryId/Reject",
    Admin_midllware,
    async (req, res) => {
        const { summaryId } = req.params;
        const { studentId } = req.body; // We need studentId from the request body, same as in Accept

        // Check if courseId and studentId are provided
        if (!summaryId || !studentId) {
            return res.status(409).json({
                message: "Missing data: SummaryId and StudentId are required",
            });
        }

        // Start a transaction
        const t = await sequelize.transaction();

        try {
            // Find the course and payment request
            const summary = await Summary.findOne({
                where: { id: summaryId },
                transaction: t,
            });
            const payment_request = await Summary_Purcase_Requests.findOne({
                where: { id: summaryId, StudentId: studentId },
                transaction: t,
            });

            // Check if the course and payment request exist
            if (!summary || !payment_request) {
                await t.rollback(); // Rollback transaction if not found
                return res
                    .status(404)
                    .json({ message: "Summary or payment request not found" });
            }

            // Update the payment request status to rejected
            await payment_request.update(
                { status: "rejected" },
                { transaction: t }
            );

            // Remove the course progress for the student if it exists
            // await Course_Progress.destroy({
            //     where: { CourseId: courseId, StudentId: studentId },
            //     transaction: t,
            // });

            // Send notifications to both teacher and student

            try {
                // Teacher notification

                // Student notification
                await Student_Notifications.create(
                    {
                        title: "Your payment has been rejected",
                        text: `Your payment for the Summary "${summary.Title}" has been rejected. Please contact support for more details.`,
                        type: "payment_rejected",
                        StudentId: studentId,
                        link: `/Student/Summary/${summary.id}/Enrollment/?rejected=true`,
                    },
                    { transaction: t }
                );
            } catch (error) {
                await t.rollback(); // Rollback transaction if notification fails
                return res.status(500).json({ error: error.message });
            }

            // Commit the transaction
            await t.commit();

            // Respond with success
            res.status(200).json({
                message: "Summary payment rejected successfully",
            });
        } catch (err) {
            // Rollback the transaction in case of an error
            await t.rollback();
            console.error("Error processing Summary payment rejection:", err);
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }
);

module.exports = router;
