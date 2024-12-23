const express = require("express");
const router = express.Router();

const GeustController = require("../Controllers/Geust");
router.get("/Courses", GeustController.GetCourses);
router.get("/Courses/:courseId", GeustController.GetCourse);
module.exports = router;
