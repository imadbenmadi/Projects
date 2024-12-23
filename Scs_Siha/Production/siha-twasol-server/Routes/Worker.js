const express = require("express");
const router = express.Router();

const Worker_Middlware = require("../Middlewares/Worker_middleware");
const WorkerController = require("../Controllers/Worker_controller");

router.get(
    "/:userId/Profile",
    Worker_Middlware,
    WorkerController.Profile_controller.getProfile
);
router.put(
    "/:userId/Profile",
    Worker_Middlware,
    WorkerController.Profile_controller.EditeProfile
);
// _________________________________________________________________
router.get(
    "/:userId/:companyId/Blogs",
    Worker_Middlware,
    WorkerController.Blogs_controller.get_All
);
router.get(
    "/:userId/:companyId/Blogs/:blogId",
    Worker_Middlware,
    WorkerController.Blogs_controller.get_by_id
);

router.delete(
    "/:userId/:companyId/Blogs/:blogId",
    Worker_Middlware,
    WorkerController.Blogs_controller.delete_blog
);
// _________________________________________________________________
router.get(
    "/:userId/:companyId/Events",
    Worker_Middlware,
    WorkerController.Events_controller.get_All
);
router.get(
    "/:userId/:companyId/Events/:eventId",
    Worker_Middlware,
    WorkerController.Events_controller.get_by_id
);


// _____________________________
// Formidable images
const cookieParser = require("cookie-parser");
const formidableMiddleware = require("express-formidable");
router.use(cookieParser());
router.use(formidableMiddleware());
router.delete(
    "/:userId/:companyId/Events/:eventId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Worker_Middlware,
    WorkerController.Events_controller.delete_event
);

router.post(
    "/:userId/:companyId/Blogs",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Worker_Middlware,
    WorkerController.Blogs_controller.add_blog
);
router.put(
    "/:userId/:companyId/Blogs/:blogId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Worker_Middlware,
    WorkerController.Blogs_controller.edit_blog
);
router.post(
    "/:userId/:companyId/Events",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Worker_Middlware,
    WorkerController.Events_controller.add_event
);
router.put(
    "/:userId/:companyId/Events/:eventId",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Worker_Middlware,
    WorkerController.Events_controller.edit_event
);
module.exports = router;
