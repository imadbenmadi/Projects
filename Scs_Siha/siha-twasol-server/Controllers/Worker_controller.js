const Blogs_controller = require("./Worker/Blogs");
const Events_controller = require("./Worker/Events");
const Profile_controller = require("./Worker/Profile");

const MaladController = {
    Profile_controller,
    Blogs_controller,
    Events_controller,
};

module.exports = MaladController;
