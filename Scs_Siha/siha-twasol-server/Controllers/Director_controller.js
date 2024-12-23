const profile_controller = require("./Director/Profile");
const worker_controller = require("./Director/Workers");
const Services_controller = require("./Director/Services");
const Doctors_controller = require("./Director/Doctors");
const Blogs_controller = require("./Director/Blogs");
const Events_controller = require("./Director/Events");
const DirectorController = {
    profile_controller,
    worker_controller,
    Services_controller,
    Doctors_controller,
    Blogs_controller,
    Events_controller,
};

module.exports = DirectorController;
