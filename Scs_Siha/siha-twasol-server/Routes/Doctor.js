const express = require("express");
const router = express.Router();

const Doctor_Middlware = require("../Middlewares/Doctor_middleware");
const DoctorController = require("../Controllers/Doctor_controller");

router.get(
    "/:userId/Profile",
    Doctor_Middlware,
    DoctorController.profile_controller.getProfile
);
// _________________________________________________________________
router.get(
    "/:userId/:companyId/Blogs",
    Doctor_Middlware,
    DoctorController.Blogs_controller.get_All
);
router.get(
    "/:userId/:companyId/Blogs/:blogId",
    Doctor_Middlware,
    DoctorController.Blogs_controller.get_by_id
);

router.delete(
    "/:userId/:companyId/Blogs/:blogId",
    Doctor_Middlware,
    DoctorController.Blogs_controller.delete_blog
);
// _________________________________________________________________
router.get(
    "/:userId/Malads",
    Doctor_Middlware,
    DoctorController.MaladsController.get_All
);
router.get(
    "/:userId/Malads/Own",
    Doctor_Middlware,
    DoctorController.MaladsController.get_own_malads
);
router.get(
    "/:userId/Malads/Own/:maladId",
    Doctor_Middlware,
    DoctorController.MaladsController.get_own_malad_by_id
);
router.get(
    "/:userId/Malads/:maladId",
    Doctor_Middlware,
    DoctorController.MaladsController.get_by_id
);

router.post(
    "/:userId/Malads/:maladId/Add",
    Doctor_Middlware,
    DoctorController.MaladsController.add_malads_to_list
);
router.delete(
    "/:userId/Malads/:maladId",
    Doctor_Middlware,
    DoctorController.MaladsController.remove_malad_from_list
);
router.post(
    "/:userId/Malads/:maladId/Rate",
    Doctor_Middlware,
    DoctorController.MaladsController.rate_malad
);

// _________________________________________________________________
router.get(
    "/:userId/:companyId/Events",
    Doctor_Middlware,
    DoctorController.Events_controller.get_All
);
router.get(
    "/:userId/:companyId/Events/:eventId",
    Doctor_Middlware,
    DoctorController.Events_controller.get_by_id
);
// _____________________________

router.get(
    "/:userId/:companyId/Files/:fileId",
    Doctor_Middlware,
    DoctorController.Files_controller.get_file
);
router.delete(
    "/:userId/:companyId/Files/:fileId",
    Doctor_Middlware,
    DoctorController.Files_controller.delete_file
);

// Formidable images
const cookieParser = require("cookie-parser");
const formidableMiddleware = require("express-formidable");
router.use(cookieParser());
router.use(formidableMiddleware());
router.put(
    "/:userId/Profile",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Doctor_Middlware,
    DoctorController.profile_controller.EditeProfile
);

router.delete(
    "/:userId/:companyId/Events/:eventId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Doctor_Middlware,
    DoctorController.Events_controller.delete_event
);

router.post(
    "/:userId/:companyId/Blogs",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Doctor_Middlware,
    DoctorController.Blogs_controller.add_blog
);
router.put(
    "/:userId/:companyId/Blogs/:blogId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Doctor_Middlware,
    DoctorController.Blogs_controller.edit_blog
);
router.post(
    "/:userId/:companyId/Events",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Doctor_Middlware,
    DoctorController.Events_controller.add_event
);
router.put(
    "/:userId/:companyId/Events/:eventId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Doctor_Middlware,
    DoctorController.Events_controller.edit_event
);

router.post(
    "/:userId/Malads/:maladId/Files",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Doctor_Middlware,
    DoctorController.Files_controller.upload_file
);

module.exports = router;
