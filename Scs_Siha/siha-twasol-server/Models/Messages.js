const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Malad } = require("./Malad");
const { Doctor } = require("./Doctor");

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
        type: DataTypes.ENUM("malad", "doctor", "admin"),
        allowNull: false,
    },
    receiverType: {
        type: DataTypes.ENUM("malad", "doctor", "admin"),
        allowNull: false,
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
const MessagesRoom = sequelize.define("MessagesRoom", {
    maladId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maladUnreadMessages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    doctorUnreadMessages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    adminUnreadMessages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});
Messages.belongsTo(Malad, {
    foreignKey: "senderId",
    constraints: false,
    as: "maladSender",
});
Messages.belongsTo(Doctor, {
    foreignKey: "senderId",
    constraints: false,
    as: "doctorSender",
});
Messages.belongsTo(Malad, {
    foreignKey: "receiverId",
    constraints: false,
    as: "maladReceiver",
});
Messages.belongsTo(Doctor, {
    foreignKey: "receiverId",
    constraints: false,
    as: "doctorReceiver",
});
Messages.belongsTo(MessagesRoom, {
    foreignKey: "roomId",
    constraints: false,
});

MessagesRoom.hasMany(Messages, {
    foreignKey: "roomId",
    constraints: false,
});

MessagesRoom.belongsTo(Malad, {
    foreignKey: "maladId",
    constraints: false,
});
MessagesRoom.belongsTo(Doctor, {
    foreignKey: "doctorId",
    constraints: false,
});

module.exports = { Messages, MessagesRoom };
