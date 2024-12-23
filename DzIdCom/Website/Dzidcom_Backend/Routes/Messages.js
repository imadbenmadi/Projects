const express = require("express");
const router = express.Router();
const {
    get_Freelancer_Rooms,
    get_Client_Rooms,
    get_Freelancer_ChatRoom,
    get_Client_ChatRoom,
    post_Freelancer_Message,
    post_Client_Message,
} = require("../Controllers/Chat/chatController");
const {
    openChatRoom,
    deleteChatRoom,
} = require("../Controllers/Chat/RoomController");
const ClientMiddleware = require("../Middlewares/Client");
const FreelancerMiddleware = require("../Middlewares/Freelancer");

router.get(
    "/freelancer/:freelancerId/rooms",
    FreelancerMiddleware,
    get_Freelancer_Rooms
);
router.get("/client/:clientId/rooms", ClientMiddleware, get_Client_Rooms);

router.get(
    "/freelancer/:freelancerId/rooms/:roomId",
    FreelancerMiddleware,
    get_Freelancer_ChatRoom
);
router.get(
    "/client/:clientId/rooms/:roomId",
    ClientMiddleware,
    get_Client_ChatRoom
);

router.post(
    "/freelancer/:freelancerId/rooms/:roomId",
    FreelancerMiddleware,
    post_Freelancer_Message
);
router.post(
    "/client/:clientId/rooms/:roomId",
    ClientMiddleware,
    post_Client_Message
);

router.post("/rooms", openChatRoom);
router.delete("/rooms/:roomId", deleteChatRoom);

module.exports = router;
