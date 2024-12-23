const express = require("express");
const router = express.Router();

const Client_Middlware = require("../Middlewares/Client");
const ClientController = require("../Controllers/Client");
router.get("/:userId/Profile", Client_Middlware, ClientController.getProfile);
router.put("/:userId/Profile", Client_Middlware, ClientController.EditeProfile);

router.get("/:userId/Projects", Client_Middlware, ClientController.GetProjcts);
router.get(
    "/:userId/Projects/:projectId",
    Client_Middlware,
    ClientController.GetProject
);
router.post("/:userId/Projects", Client_Middlware, ClientController.AddProject);
router.delete(
    "/:userId/Projects/:projectId",
    Client_Middlware,
    ClientController.DeleteProject
);

router.get(
    "/:userId/Payment/:projectId/status",
    Client_Middlware,
    ClientController.PaymentStatus
);

router.get("/:userId/Process", Client_Middlware, ClientController.GetProcess);

router.post(
    "/:userId/Projects/:projectId/Accept_work",
    Client_Middlware,
    ClientController.Accept_work
);
router.post(
    "/:userId/Projects/:projectId/Reject_work",
    Client_Middlware,
    ClientController.Reject_work
);
router.get(
    "/:userId/:projectId/Rejections",
    Client_Middlware,
    ClientController.GetRejections
);

router.get(
    "/:userId/Notifications",
    Client_Middlware,
    ClientController.GetNotifications
);
router.delete(
    "/:userId/Notifications/:notificationId",
    Client_Middlware,
    ClientController.DeleteNotification
);
router.post(
    "/:userId/Rate/:freelancerId",
    Client_Middlware,
    ClientController.RateFreealncer
);

router.get(
    "/:userId/Feedbacks",
    Client_Middlware,
    ClientController.GetFeedbacks
);
module.exports = router;
