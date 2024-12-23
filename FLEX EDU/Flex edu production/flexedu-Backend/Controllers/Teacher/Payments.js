const Courses = require("../../Models/Course");
const Teachers = require("../../Models/Teacher");
const Summary = require("../../Models/Summary");
const Students = require("../../Models/Student");
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests");
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");
const { Sequelize } = require("sequelize");
const Get_Payment = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized, missing userId" });

    try {
        let course_Purcase_Requests = [];
        const teacher = await Teachers.findByPk(userId);
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found." });
        }

        const TeacherCourses = await Courses.findAll({
            where: {
                TeacherId: userId,
            },
        });

        if (TeacherCourses.length > 0) {
            course_Purcase_Requests = await Course_Purcase_Requests.findAll({
                where: {
                    CourseId: TeacherCourses.map((course) => course.id),
                    status: "accepted",
                },
                include: [
                    {
                        model: Courses,
                    },
                    {
                        model: Students,
                    },
                ],
                order: [["createdAt", "DESC"]],
            });
        }

        let summary_Purcase_Requests = [];
        const TeacherSummary = await Summary.findAll({
            where: {
                TeacherId: userId,
            },
        });

        if (TeacherSummary.length > 0) {
            summary_Purcase_Requests = await Summary_Purcase_Requests.findAll({
                where: {
                    SummaryId: TeacherSummary.map((summary) => summary.id),
                    status: "accepted",
                },
                include: [
                    {
                        model: Summary,
                    },
                    {
                        model: Students,
                    },
                ],
                order: [["createdAt", "DESC"]],
            });
        }

        return res.status(200).json({
            course_Purcase_Requests: course_Purcase_Requests,
            summary_Purcase_Requests: summary_Purcase_Requests,
            CCP_number: teacher.CCP_number,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const getCoursesWithStudentCount = async (req, res) => {
    try {
        const courses = await Courses.findAll({
            include: [
                {
                    model: Course_Purcase_Requests,
                    attributes: [],
                },
            ],
            attributes: [
                "id",
                "Title",
                "Price",
                "Category",
                "Rate",
                [
                    Sequelize.fn(
                        "COUNT",
                        Sequelize.col("Course_Purcase_Requests.id")
                    ),
                    "studentCount",
                ],
            ],
            group: ["Courses.id"],
        });

        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: "Error fetching courses." });
    }
};

const GetSummariesWithStudentsCount = async (req, res) => {
    try {
        const summaries = await Summary.findAll({
            include: [
                {
                    model: Summary_Purcase_Requests,
                    attributes: [],
                },
            ],
            attributes: [
                "id",
                "Title",
                "Price",
                "Category",
                "Rate",
                [
                    Sequelize.fn(
                        "COUNT",
                        Sequelize.col("Summary_Purcase_Requests.id")
                    ),
                    "studentCount",
                ],
            ],
            group: ["Summary.id"],
        });

        return res.status(200).json(summaries);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: "Error fetching summaries." });
    }
};

module.exports = {
    Get_Payment,
    getCoursesWithStudentCount,
    GetSummariesWithStudentsCount,
};
