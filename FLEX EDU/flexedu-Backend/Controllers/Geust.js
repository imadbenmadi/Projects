const Courses = require("../Models/Course");
const Course_Video = require("../Models/Course_Video");
const GetCourses = async (req, res) => {
  try {
    const courses = await Courses.findAll({
      include: [
        {
          model: Course_Video,
          // as: "Course_Video",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    // if (!courses) return res.status(404).json({ error: "No courses found." });
    return res.status(200).json({ Courses: courses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
const GetCourse = async (req, res) => {
  const courseId = req.params.courseId;
  if (!courseId)
    return res
      .status(409)
      .json({ error: "Unauthorized , missing userId or courseId" });
  try {
    const course = await Courses.findOne({
      where: {
        id: courseId,
        // TeacherId: userId,
      },
      include: [
        {
          model: Course_Video,
          // as: "Course_Video",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    if (!course) return res.status(404).json({ error: "course not found." });

    return res.status(200).json({ Course: course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  GetCourses,
  GetCourse,
};
