const mongoose = require("mongoose");
const Message = require("./Schema/MessageSchema");

class Database {
    constructor() {
        this.Url =
            // "mongodb+srv://imad:imad@messages.iz8tukm.mongodb.net/?retryWrites=true&w=majority";
            "mongodb://imad:imadimad05052004@ac-0fnrh8l-shard-00-00.f1u8evk.mongodb.net:27017,ac-0fnrh8l-shard-00-01.f1u8evk.mongodb.net:27017,ac-0fnrh8l-shard-00-02.f1u8evk.mongodb.net:27017/?ssl=true&replicaSet=atlas-sqlpdj-shard-0&authSource=admin&retryWrites=true&w=majority";
    }

    async connect() {
        try {
            await mongoose.connect(this.Url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to the database");
        } catch (err) {
            console.error("Error connecting to the database:", err);
        }
    }
    async getMessages() {
        try {
            const messages = await Message.find({});
            return messages;
        } catch (err) {
            console.error("Error fetching messages:", err);
            throw err;
        }
    }
    async addMessage(messageData) {
        try {
            const newMessage = new Message(messageData);
            await newMessage.save();
            console.log("Message saved successfully");
        } catch (err) {
            console.error("Error saving message:", err);
            throw err;
        }
    }
}

module.exports = Database;
