const { getProfile, edit_profile, change_CCP } = require("./Teacher/Profile");
const { GetNotifications } = require("./Teacher/Notifications");
const { DeleteNotification } = require("./Teacher/Notifications");
const {
    add_course,
    GetCourses,
    DeleteCourse,
    GetCourse,
    EditCourse,
    Get_Vedio,
} = require("./Teacher/Courses");
const {
    GetSummaries,
    GetSummary,
    EditSummary,
    DeleteSummary,
    add_Summary,
} = require("./Teacher/Summaries");
const {
    Get_Payment,
    getCoursesWithStudentCount,
    GetSummariesWithStudentsCount,
} = require("./Teacher/Payments");
const {
    GetMeetings,
    GetMeeting,
    AddMeeting,
    DeleteMeeting,
} = require("./Teacher/Meeting");

const {
    Delete_course_review,
    Delete_summary_review,
} = require("./Teacher/Reviews");
const TeacherController = {
    getProfile,
    getCoursesWithStudentCount,
    change_CCP,
    GetNotifications,
    DeleteNotification,
    add_course,
    GetCourses,
    DeleteCourse,
    edit_profile,
    GetCourse,
    EditCourse,
    Get_Vedio,
    GetSummaries,
    GetSummary,
    EditSummary,
    DeleteSummary,
    add_Summary,
    Get_Payment,
    GetSummariesWithStudentsCount,
    GetMeetings,
    GetMeeting,
    AddMeeting,
    DeleteMeeting,
    Delete_course_review,
    Delete_summary_review,
};

module.exports = TeacherController;
