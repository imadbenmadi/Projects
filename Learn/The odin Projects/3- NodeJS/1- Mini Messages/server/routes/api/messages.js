const express = require("express");
const router = express.Router();
const messagesController = require("../../controllers/messagesController");

router
    .route("/")
    .post(messagesController.addMessage)
    .get(messagesController.getAllMessages);
    

module.exports = router;
