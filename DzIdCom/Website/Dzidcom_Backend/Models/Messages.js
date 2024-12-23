const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Freelancers } = require("./Freelnacer");
const { Clients } = require("./Client");

const Messages = sequelize.define("Messages", {
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // readed: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false,
    // },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    senderType: {
        type: DataTypes.ENUM("freelancer", "client", "admin"),
        allowNull: false,
    },
    receiverType: {
        type: DataTypes.ENUM("freelancer", "client", "admin"),
        allowNull: false,
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
const MessagesRoom = sequelize.define("MessagesRoom", {
    freelancerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    freelancerUnreadMessages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    clientUnreadMessages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    adminUnreadMessages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});
Messages.belongsTo(Freelancers, {
    foreignKey: "senderId",
    constraints: false,
    as: "freelancerSender",
});
Messages.belongsTo(Clients, {
    foreignKey: "senderId",
    constraints: false,
    as: "clientSender",
});
Messages.belongsTo(Freelancers, {
    foreignKey: "receiverId",
    constraints: false,
    as: "freelancerReceiver",
});
Messages.belongsTo(Clients, {
    foreignKey: "receiverId",
    constraints: false,
    as: "clientReceiver",
});
Messages.belongsTo(MessagesRoom, {
    foreignKey: "roomId",
    constraints: false,
});

MessagesRoom.hasMany(Messages, {
    foreignKey: "roomId",
    constraints: false,
});

MessagesRoom.belongsTo(Freelancers, {
    foreignKey: "freelancerId",
    constraints: false,
});
MessagesRoom.belongsTo(Clients, {
    foreignKey: "clientId",
    constraints: false,
});

module.exports = { Messages, MessagesRoom };
