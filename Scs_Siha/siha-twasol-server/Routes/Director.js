const express = require("express");
const router = express.Router();

const Director_Middlware = require("../Middlewares/Director_midllware");
const DirectorController = require("../Controllers/Director_controller");

router.get(
    "/:userId/Profile",
    Director_Middlware,
    DirectorController.profile_controller.getProfile
);
// _____________________________
router.get(
    "/:userId/:companyId/Workers",
    Director_Middlware,
    DirectorController.worker_controller.get_All
);
router.get(
    "/:userId/:companyId/Workers/:workerId",
    Director_Middlware,
    DirectorController.worker_controller.get_by_id
);
router.put(
    "/:userId/:companyId/Workers/:workerId",
    Director_Middlware,
    DirectorController.worker_controller.edit_worker
);
router.delete(
    "/:userId/:companyId/Workers/:workerId",
    Director_Middlware,
    DirectorController.worker_controller.delet_worker
);
router.get(
    "/:userId/:companyId/Services",
    Director_Middlware,
    DirectorController.worker_controller.get_Services
);
router.post(
    "/:userId/:companyId/Workers",
    Director_Middlware,
    DirectorController.worker_controller.add_worker
);
// _____________________________
router.get(
    "/:userId/:companyId/Services",
    Director_Middlware,
    DirectorController.Services_controller.get_All
);
router.get(
    "/:userId/:companyId/Services/:serviceId",
    Director_Middlware,
    DirectorController.Services_controller.get_by_id
);
router.get(
    "/:userId/:companyId/Services",
    Director_Middlware,
    DirectorController.Services_controller.get_compayny_Services
);
router.put(
    "/:userId/:companyId/Services/:serviceId",
    Director_Middlware,
    DirectorController.Services_controller.edit_service
);
router.delete(
    "/:userId/:companyId/Services/:serviceId",
    Director_Middlware,
    DirectorController.Services_controller.delet_service
);
router.post(
    "/:userId/:companyId/Services",
    Director_Middlware,
    DirectorController.Services_controller.add_service
);
// _____________________________
router.get(
    "/:userId/:companyId/Doctors",
    Director_Middlware,
    DirectorController.Doctors_controller.get_All
);
router.get(
    "/:userId/:companyId/Doctors/:doctorId",
    Director_Middlware,
    DirectorController.Doctors_controller.get_by_id
);
router.put(
    "/:userId/:companyId/Doctors/:doctorId",
    Director_Middlware,
    DirectorController.Doctors_controller.edit_doctor
);
router.delete(
    "/:userId/:companyId/Doctors/:doctorId",
    Director_Middlware,
    DirectorController.Doctors_controller.delet_doctor
);

router.post(
    "/:userId/:companyId/Doctors",
    Director_Middlware,
    DirectorController.Doctors_controller.add_doctor
);
// _____________________________
router.get(
    "/:userId/:companyId/Blogs",
    Director_Middlware,
    DirectorController.Blogs_controller.get_All
);
router.get(
    "/:userId/:companyId/Blogs/:blogId",
    Director_Middlware,
    DirectorController.Blogs_controller.get_by_id
);

router.delete(
    "/:userId/:companyId/Blogs/:blogId",
    Director_Middlware,
    DirectorController.Blogs_controller.delete_blog
);

// _____________________________
router.get(
    "/:userId/:companyId/Events",
    Director_Middlware,
    DirectorController.Events_controller.get_All
);
router.get(
    "/:userId/:companyId/Events/:eventId",
    Director_Middlware,
    DirectorController.Events_controller.get_by_id
);

router.delete(
    "/:userId/:companyId/Events/:eventId",
    Director_Middlware,
    DirectorController.Events_controller.delete_event
);

// _____________________________
// Formidable images
const cookieParser = require("cookie-parser");
const formidableMiddleware = require("express-formidable");
router.use(cookieParser());
router.use(formidableMiddleware());

router.post(
    "/:userId/:companyId/Blogs",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Director_Middlware,
    DirectorController.Blogs_controller.add_blog
);
router.put(
    "/:userId/:companyId/Blogs/:blogId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Director_Middlware,
    DirectorController.Blogs_controller.edit_blog
);

router.post(
    "/:userId/:companyId/Events",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Director_Middlware,
    DirectorController.Events_controller.add_event
);
router.put(
    "/:userId/:companyId/Events/:eventId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Director_Middlware,
    DirectorController.Events_controller.edit_event
);
module.exports = router;
