const { getProfile } = require("./Client/Profle/getProfile");
const { EditeProfile } = require("./Client/Profle/EditeProfile");
const { AddProject } = require("./Client/Project/AddProject");
const { DeleteProject } = require("./Client/Project/DeleteProject");
const { GetProjcts } = require("./Client/Project/GetProjects");
const { GetProject } = require("./Client/Project/GetProject");
const { PaymentStatus } = require("./Client/Project/PaymentStatus");
const { GetProcess } = require("./Client/Project/GetProcess");
const { GetRejections } = require("./Client/Project/GetRejection");
const { GetNotifications } = require("./Client/Notifications");
const { DeleteNotification } = require("./Client/Notifications");
const {
    Accept_work,
    Reject_work,
} = require("./Client/Project/Accept_Reject_work");

const { RateFreealncer } = require("./Client/Feedback_to_Freealncer");
const { GetFeedbacks } = require("./Client/GetFeedbacks");
const ClientController = {
    getProfile,
    EditeProfile,
    AddProject,
    DeleteProject,
    GetProjcts,
    GetProject,
    PaymentStatus,
    GetProcess,
    Accept_work,
    Reject_work,
    GetRejections,
    GetNotifications,
    DeleteNotification,
    RateFreealncer,
    GetFeedbacks,
};

module.exports = ClientController;
