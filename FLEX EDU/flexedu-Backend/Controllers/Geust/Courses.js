const Courses = require("../../Models/Course");
const Course_Video = require("../../Models/Course_Video");

const GetCourses = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const courses = await Courses.findAll({
            where: {
                TeacherId: userId,
            },
            order: [["createdAt", "DESC"]],
        });
        // if (!courses)
        //     return res.status(404).json({ error: "No courses found." });
        return res.status(200).json({ Courses: courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const GetCourse = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    if (!userId || !courseId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or courseId" });
    try {
        const course = await Courses.findOne({
            where: {
                id: courseId,
                TeacherId: userId,
            },
            include: [
                {
                    model: Course_Video,
                    // as: "Course_Video",
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        return res.status(200).json({ Course: course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const Get_Vedio = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    const vedioId = req.params.vedioId;
    if (!userId || !courseId || !vedioId)
        return res.status(409).json({
            error: "Unauthorized , missing userId or courseId or vedioId",
        });
    try {
        const vedio = await Course_Video.findOne({
            where: {
                id: vedioId,
                CourseId: courseId,
            },
        });
        if (!vedio) return res.status(404).json({ error: "vedio not found." });

        return res.status(200).json({ vedio });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    GetCourses,
    GetCourse,
    Get_Vedio,
};
