const express = require("express");
const router = express.Router();
const Upload_Teacher_ProfilePic = require("./ProfilePic/Teacher_ProfilePic");
const Delete_Teacher_ProfilePic = require("./ProfilePic/Teacher_ProfilePic_Delete");
const Upload_Student_ProfilePic = require("./ProfilePic/Student_ProfilePic");
const Delete_Student_ProfilePic = require("./ProfilePic/Student_ProfilePic_Delete");
const Upload_Course_Payment = require("./Payment_screenShots/Upload_Course_Payment");
const Upload_Summary_Payment = require("./Payment_screenShots/Upload_Summary_Payment");
const Upload_Course_Image = require("./Course_Image/Course_Pic");
const Delete_Course_Image = require("./Course_Image/Course_Pic_Delete");
const Upload_Course_Vedio = require("./Course_Vedio/Course_Vedio");
const Delete_Course_Video = require("./Course_Vedio/Course_Vedio_Delete");
const upload_Summary = require("./Summary/Summary");
const delete_Summary = require("./Summary/Summary_Delete");
const delete_Summary_Image = require("./Summary/Summary_Pic_Delete");
const upload_Summary_Pic = require("./Summary/Summary_Pic");

const Student_Middlware = require("../../Middlewares/Student");
const Teacher_Middlware = require("../../Middlewares/Teacher");
const cookieParser = require("cookie-parser");
const formidableMiddleware = require("express-formidable");
router.use(cookieParser());
router.use(formidableMiddleware());

router.post(
    "/Teacher/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Teacher_Middlware,
    Upload_Teacher_ProfilePic
);
router.post(
    "/Student/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Student_Middlware,
    Upload_Student_ProfilePic
);
router.delete(
    "/Teacher/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Teacher_Middlware,
    Delete_Teacher_ProfilePic
);
router.delete(
    "/Student/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Student_Middlware,
    Delete_Student_ProfilePic
);
// ______________________________________________________
router.post(
    `/Courses/:courseId/Image`,
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Teacher_Middlware,
    Upload_Course_Image
);
router.delete(
    `/Courses/:courseId/Image`,
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Teacher_Middlware,
    Delete_Course_Image
);
// ______________________________________________________
router.post(
    `/Courses/:courseId/Vedio`,
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Teacher_Middlware,
    Upload_Course_Vedio
);
router.delete(
    `/Courses/:courseId/Vedios/:videoId`,
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Teacher_Middlware,
    Delete_Course_Video
); // ______________________________________________________
router.post(
    `/Summaries/:summaryId/Image`,
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Teacher_Middlware,
    upload_Summary_Pic
);
router.delete(
    `/Summaries/:summaryId/Image`,
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Teacher_Middlware,
    delete_Summary_Image
);
// ______________________________________________________
router.post(
    `/Summaries`,
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Teacher_Middlware,
    upload_Summary
);
router.delete(
    `/Summaries/:summaryId`,
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Teacher_Middlware,
    delete_Summary
);

// ______________________________________________________

router.post(
    "/Payment/Courses/:courseId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Student_Middlware,
    Upload_Course_Payment
);
router.post(
    "/Payment/Summaries/:summaryId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Student_Middlware,
    Upload_Summary_Payment
);

module.exports = router;
