const Courses = require("../../Models/Course");
const Students = require("../../Models/Student");
const Course_Progress = require("../../Models/Course_Progress");
const Course_Video = require("../../Models/Course_Video");
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests");
const Reviews = require("../../Models/Review_Course");
const Course_Meets = require("../../Models/Course_Meets");

const Get_Courses = async (req, res) => {
  const userId = req.decoded.userId;
  if (!userId)
    return res.status(401).json({ error: "Unauthorized , missing userId" });
  try {
    const courses = await Courses.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Course_Video,
          // as: "Course_Video",
        },
      ],
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
        // TeacherId: userId,
      },
      include: [
        {
          model: Course_Video,

          // as: "Course_Video",
        },
        {
          model: Course_Meets,
          // as: "Course_Meets",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    if (!course) return res.status(404).json({ error: "course not found." });
    let isEnrolled = false;
    let isReviewed = false;
    let paymentStatus = null;
    const student = await Students.findOne({
      where: {
        id: userId,
      },
    });
    const purcase = await Course_Purcase_Requests.findOne({
      where: {
        CourseId: courseId,
        StudentId: userId,
      },
    });
    if (purcase) {
      paymentStatus = purcase.status;
    }

    if (!student)
      return res.status(409).json({ error: "Unauthorized , not a student" });
    const course_progress = await Course_Progress.findOne({
      where: {
        StudentId: userId,
        CourseId: courseId,
      },
    });
    if (course_progress) {
      isEnrolled = true;
    }
    const reviews = await Reviews.findAll({
      where: {
        StudentId: userId,
        CourseId: courseId,
      },
    });
    if (!reviews) {
      isReviewed = true;
    }
    const all_reviews = await Reviews.findAll({
      where: {
        CourseId: courseId,
      },
      include: [
        {
          model: Students,
          attributes: ["id", "FirstName", "LastName"],
        },
      ],
    });
    return res.status(200).json({
      isEnrolled: isEnrolled,
      isReviewed: isReviewed,
      paymentStatus,
      purcase,
      Course: course,
      course_progress,
      all_reviews: all_reviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
const change_Progress = async (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;
  const progress = req.body.progress;
  const videoId = req.body.videoId;

  if (progress === undefined || progress === null)
    return res.status(409).json({ error: "Progress is required." });
  else if (!userId || !courseId)
    return res
      .status(409)
      .json({ error: "Unauthorized, missing userId or courseId" });

  try {
    const course = await Courses.findOne({
      where: { id: courseId },
    });

    if (!course) return res.status(404).json({ error: "Course not found." });

    const student = await Students.findOne({
      where: { id: userId },
    });

    if (!student)
      return res.status(409).json({ error: "Unauthorized, not a student." });

    const courseVideos = await Course_Video.findAll({
      where: { CourseId: courseId },
    });

    if (!courseVideos || courseVideos.length === 0)
      return res
        .status(404)
        .json({ error: "No videos found for this course." });

    // Check if the progress is within the bounds of total course videos
    if (progress > courseVideos.length)
      return res
        .status(409)
        .json({ error: "Progress exceeds total number of videos." });

    let courseProgress = await Course_Progress.findOne({
      where: {
        StudentId: userId,
        CourseId: courseId,
      },
    });
    if (courseProgress && videoId) {
      try {
        // Ensure WatchedVideos is an array
        let watchedVideos = Array.isArray(courseProgress.WatchedVideos)
          ? courseProgress.WatchedVideos
          : [];

        // Only add videoId if it's not already in the array
        if (!watchedVideos.includes(videoId)) {
          // Create a new array instance to avoid reference issues
          watchedVideos = [...watchedVideos, videoId];
          courseProgress.WatchedVideos = watchedVideos;
          await courseProgress.save();
        }
      } catch (error) {
        console.error("Error updating watched videos array:", error);
        throw error;
      }
    }
    if (courseProgress) {
      // If course progress exists, update it
      await courseProgress.update({ Progress: progress });
      return res
        .status(200)
        .json({ message: "Progress updated successfully." });
    } else {
      // If course progress does not exist, create a new progress record
      await Course_Progress.create({
        StudentId: userId,
        CourseId: courseId,
        progress,
      });
      updateWatchedVideos(userId, courseId, videoId);
      return res
        .status(200)
        .json({ message: "Progress created and updated successfully." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  GetCourse,
  Get_Courses,
  change_Progress,
};
