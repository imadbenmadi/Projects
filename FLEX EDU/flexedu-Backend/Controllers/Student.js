const { getProfile, edit_profile } = require("./Student/Profile");
const {
  GetNotifications,
  DeleteNotification,
} = require("./Student/Notifications");
const {
  GetCourse,
  Get_Courses,
  change_Progress,
} = require("./Student/Courses");
const {
  Get_Summaries,
  GetSummary,
  Search_Summaries,
} = require("./Student/Summaries");
const {
  GetPurchased,
  GetPurchasedCourse,
  GetPurchasedSummary,
} = require("./Student/Purchased");
const { post_course_review, post_summary_review } = require("./Student/Review");
const StudentController = {
  getProfile,
  GetNotifications,
  DeleteNotification,
  edit_profile,
  GetCourse,
  Get_Courses,
  Get_Summaries,
  GetSummary,
  GetPurchased,
  GetPurchasedCourse,
  GetPurchasedSummary,
  change_Progress,
  post_course_review,
  post_summary_review,
  Search_Summaries,
};

module.exports = StudentController;
