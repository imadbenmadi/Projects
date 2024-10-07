const mongoose = require("mongoose");
MessageSchema = mongoose.Schema(
    {
        text: { type: String, required: true },
        user: { type: String, required: true },
        createdDate: { type: Date, required: true },
    },
    {
        collection: "messages",
    }
);
module.exports = mongoose.model("messages", MessageSchema);
