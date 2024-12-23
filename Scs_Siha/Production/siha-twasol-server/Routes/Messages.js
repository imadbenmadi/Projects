const express = require("express");
const router = express.Router();
const {
    get_Malad_Rooms,
    get_Doctor_Rooms,
    get_Malad_ChatRoom,
    get_Doctor_ChatRoom,
    post_Malad_Message,
    post_Doctor_Message,
} = require("../Controllers/Chat/chatController");
const {
    openChatRoom,
    deleteChatRoom,
} = require("../Controllers/Chat/RoomController");
const DoctorMiddleware = require("../Middlewares/Doctor_middleware");
const MaladMiddleware = require("../Middlewares/Malad_middleware");

router.get("/malad/:maladId/rooms", MaladMiddleware, get_Malad_Rooms);
router.get("/doctor/:doctorId/rooms", DoctorMiddleware, get_Doctor_Rooms);

router.get(
    "/malad/:maladId/rooms/:roomId",
    MaladMiddleware,
    get_Malad_ChatRoom
);
router.get(
    "/doctor/:doctorId/rooms/:roomId",
    DoctorMiddleware,
    get_Doctor_ChatRoom
);

router.post(
    "/malad/:maladId/rooms/:roomId",
    MaladMiddleware,
    post_Malad_Message
);
router.post(
    "/doctor/:doctorId/rooms/:roomId",
    DoctorMiddleware,
    post_Doctor_Message
);

router.post("/rooms", openChatRoom);
router.delete("/rooms/:roomId", deleteChatRoom);

module.exports = router;
