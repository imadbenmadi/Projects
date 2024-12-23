const profile_controller = require("./Malad/Profile");
const Company_controller = require("./Malad/Companies");
const Blog_controller = require("./Malad/Blogs");
const Event_controller = require("./Malad/Events");
const Follow_controller = require("./Malad/Follow");
const Doctor_Controller = require("./Malad/Doctor");
const RateController = require("./Malad/Rate");
const NotificationController = require("./Malad/Notifications");
const MaladController = {
    profile_controller,
    Company_controller,
    Doctor_Controller,
    Blog_controller,
    Event_controller,
    Follow_controller,
    RateController,
    NotificationController,
};
module.exports = MaladController;
