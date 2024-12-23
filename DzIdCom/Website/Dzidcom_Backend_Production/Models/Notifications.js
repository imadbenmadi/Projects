const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Freelancers } = require("./Freelnacer");
const { Clients } = require("./Client");
const Client_Notifications = sequelize.define("Client_Notifications", {
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(
            "Project_Accepted",
            "Projet_refused",
            "Freelancer_found",
            "payment_accepted",
            "payment_rejected",
            "Freelancer_uploaded_work"
        ),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unread",
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
const Freelancer_Notifications = sequelize.define("Freelancer_Notifications", {
    FreelancerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(
            "Project_Accepted",
            "Projet_refused",
            "Freelancer_found",
            "payment_accepted",
            "payment_rejected",
            "Freelancer_uploaded_work"
        ),
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unread",
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Freelancer_Notifications.belongsTo(Freelancers, {
    as: "Freelancer",
    foreignKey: "FreelancerId",
});
Freelancers.hasMany(Freelancer_Notifications, {
    as: "Freelancer_Notifications",
    foreignKey: "FreelancerId",
});

Client_Notifications.belongsTo(Clients, {
    as: "Client",
    foreignKey: "ClientId",
});
Clients.hasMany(Client_Notifications, {
    as: "Client_Notifications",
    foreignKey: "ClientId",
});
module.exports = { Freelancer_Notifications, Client_Notifications };
