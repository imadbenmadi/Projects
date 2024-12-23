const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Clients } = require("./Client");
const { Freelancers } = require("./Freelnacer");
const Rejection_Resons = sequelize.define("Rejection_Resons", {
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    FreelancerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

Rejection_Resons.belongsTo(Clients, { as: "Client", foreignKey: "ClientId" });
Clients.hasMany(Rejection_Resons, {
    as: "Rejection_Resons",
    foreignKey: "ClientId",
});

module.exports = { Rejection_Resons };
