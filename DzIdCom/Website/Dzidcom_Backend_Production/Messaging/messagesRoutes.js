const express = require("express");
const router = express.Router();
const messagesController = require("./messagesController"); // Adjust the path as necessary

// Send a message
router.post("/send", messagesController.sendMessage);

// Get messages for a specific user
router.get("/:userType/:userId", messagesController.getMessages);

module.exports = router;
