const express = require("express");
const router = express.Router();
const Student_Middlware = require("../Middlewares/Student");
const StudentController = require("../Controllers/Student");

router.get("/:userId/Profile", Student_Middlware, StudentController.getProfile);
router.put(
  "/:userId/Profile",
  Student_Middlware,
  StudentController.edit_profile
);
router.get(
  "/:userId/Courses",
  Student_Middlware,
  StudentController.Get_Courses
);
router.get(
  "/Courses/:courseId",
  Student_Middlware,
  StudentController.GetCourse
);
router.get("/Courses", Student_Middlware, StudentController.Get_Courses);
router.get("/Summaries", Student_Middlware, StudentController.Get_Summaries);
router.get(
  "/Summaries/:summaryId",
  Student_Middlware,
  StudentController.GetSummary
);
router.get(
  "/Summaries/Search/:search",
  Student_Middlware,
  StudentController.Search_Summaries
);

router.get(
  "/:userId/Notifications",
  Student_Middlware,
  StudentController.GetNotifications
);
router.delete(
  "/:userId/Notifications/:notificationId",
  Student_Middlware,
  StudentController.DeleteNotification
);
// ______________________________________________________
router.get(
  "/:userId/Purchased",
  Student_Middlware,
  StudentController.GetPurchased
);
router.get(
  "/:userId/Purchased/Courses/:courseId",
  Student_Middlware,
  StudentController.GetPurchasedCourse
);
router.get(
  "/:userId/Purchased/Summaries/:summaryId",
  Student_Middlware,
  StudentController.GetPurchasedSummary
);
// ______________________________________________________
router.post(
  "/:userId/Courses/:courseId/Progress",
  Student_Middlware,
  StudentController.change_Progress
);

// ______________________________________________________
router.post(
  "/:userId/Courses/:courseId/Review",
  Student_Middlware,
  StudentController.post_course_review
);
router.post(
  "/:userId/Summaries/:summaryId/Review",
  Student_Middlware,
  StudentController.post_summary_review
);
module.exports = router;
