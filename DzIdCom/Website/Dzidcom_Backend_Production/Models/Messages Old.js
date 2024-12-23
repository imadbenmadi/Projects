// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../config/db_connection");
// const { Freelancers } = require("./Freelnacer");
// const { Clients } = require("./Client");

// const Messages = sequelize.define("Messages", {
//     message: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     readed: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     senderId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     receiverId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     senderType: {
//         type: DataTypes.ENUM("freelancer", "client"),
//         allowNull: false,
//     },
//     receiverType: {
//         type: DataTypes.ENUM("freelancer", "client"),
//         allowNull: false,
//     },
// });
// const MessagesRoom = sequelize.define("MessagesRoom", {
//     freelancerId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     clientId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     freelancerUnreadedMessages: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0,
//     },
//     clientUnreadedMessages: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0,
//     },
// });
// Messages.addHook("afterFind", (findResult) => {
//     if (!Array.isArray(findResult)) findResult = [findResult];
//     for (const instance of findResult) {
//         if (instance.senderType === "freelancer" && instance.senderId) {
//             instance.sender = instance.getFreelancerSender();
//         } else if (instance.senderType === "client" && instance.senderId) {
//             instance.sender = instance.getClientSender();
//         }
//         if (instance.receiverType === "freelancer" && instance.receiverId) {
//             instance.receiver = instance.getFreelancerReceiver();
//         } else if (instance.receiverType === "client" && instance.receiverId) {
//             instance.receiver = instance.getClientReceiver();
//         }
//     }
// });

// MessagesRoom.addHook("afterFind", (findResult) => {
//     if (!Array.isArray(findResult)) findResult = [findResult];
//     for (const instance of findResult) {
//         if (instance.freelancerId) {
//             instance.freelancer = instance.getFreelancer();
//         }
//         if (instance.clientId) {
//             instance.client = instance.getClient();
//         }
//     }
// });
// MessagesRoom.belongsTo(Freelancers, {
//     foreignKey: "freelancerId",
//     constraints: false,
// });

// MessagesRoom.belongsTo(Clients, {
//     foreignKey: "clientId",
//     constraints: false,
// });

// Messages.belongsTo(MessagesRoom, {
//     foreignKey: "roomId",
//     constraints: false,
// });

// MessagesRoom.hasMany(Messages, {
//     foreignKey: "roomId",
//     constraints: false,
// });
// Freelancers.hasMany(MessagesRoom, {
//     foreignKey: "freelancerId",
//     constraints: false,
// });
// Clients.hasMany(MessagesRoom, {
//     foreignKey: "clientId",
//     constraints: false,
// });
// // Associate sender
// Messages.belongsTo(Freelancers, {
//     foreignKey: "senderId",
//     constraints: false,
//     as: "freelancerSender",
// });

// Messages.belongsTo(Clients, {
//     foreignKey: "senderId",
//     constraints: false,
//     as: "clientSender",
// });

// // Associate receiver
// Messages.belongsTo(Freelancers, {
//     foreignKey: "receiverId",
//     constraints: false,
//     as: "freelancerReceiver",
// });

// Messages.belongsTo(Clients, {
//     foreignKey: "receiverId",
//     constraints: false,
//     as: "clientReceiver",
// });

// module.exports = { Messages };
