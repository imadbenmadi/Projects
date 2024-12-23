const express = require("express");
const router = express.Router();

const Malad_Middlware = require("../Middlewares/Malad_middleware");
const MaladController = require("../Controllers/Malad_controller");

router.get(
    "/:userId/Profile",
    Malad_Middlware,
    MaladController.profile_controller.getProfile
);
router.get(
    "/:userId/Companies",
    Malad_Middlware,
    MaladController.Company_controller.get_All
);
router.get(
    "/:userId/Companies/:companyId",
    Malad_Middlware,
    MaladController.Company_controller.get_One
);
router.get(
    "/:userId/Companies/:companyId/Doctors/:doctorId",
    Malad_Middlware,
    MaladController.Doctor_Controller.get_Doctor
);
// _____________________________
router.get(
    "/:userId/Notifications",
    Malad_Middlware,
    MaladController.NotificationController.GetNotifications
);
router.delete(
    "/:userId/Notifications/:notificationId",
    Malad_Middlware,
    MaladController.NotificationController.DeleteNotification
);

// _____________________________
router.post(
    "/:userId/Companies/:companyId/Follow",
    Malad_Middlware,
    MaladController.Follow_controller.followCompany
);
router.post(
    "/:userId/Companies/:companyId/Unfollow",
    Malad_Middlware,
    MaladController.Follow_controller.unfollowCompany
);
router.get(
    "/:userId/Companies/:companyId/isFollowing",
    Malad_Middlware,
    MaladController.Follow_controller.isFollowing
);

router.get(
    "/:userId/Blogs",
    Malad_Middlware,
    MaladController.Blog_controller.get_blogs
);
router.get(
    "/:userId/Blogs/:blogId",
    Malad_Middlware,
    MaladController.Blog_controller.get_blog
);
router.get(
    "/:userId/Events",
    Malad_Middlware,
    MaladController.Event_controller.get_events
);
router.get(
    "/:userId/Events/:eventId",
    Malad_Middlware,
    MaladController.Event_controller.get_event
);
router.post(
    "/:userId/Doctors/:doctorId/Rate",
    Malad_Middlware,
    MaladController.RateController.rate_Doctor
);

// _____________________________
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
    Malad_Middlware,
    MaladController.profile_controller.EditeProfile
);
module.exports = router;
