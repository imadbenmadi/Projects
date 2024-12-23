const { getProfile } = require("./Freelancer/getProfile");
const { EditeProfile } = require("./Freelancer/EditeProfile");
const { GetProcess } = require("./Freelancer/GetProcess");
const { GetProcess_item } = require("./Freelancer/GetProcess_item");
const { GetRejections } = require("./Freelancer/GetRejection");
const {
    GetNotifications,
    DeleteNotification,
} = require("./Freelancer/Notifications");
const { RateClient } = require("./Client/Feedback_to_Client");
const { GetFeedbacks } = require("./Freelancer/GetFeedbacks");

const FreelancerController = {
    getProfile,
    EditeProfile,
    GetProcess,
    GetProcess_item,
    GetRejections,
    GetNotifications,
    DeleteNotification,
    RateClient,
    GetFeedbacks,
};

module.exports = FreelancerController;
