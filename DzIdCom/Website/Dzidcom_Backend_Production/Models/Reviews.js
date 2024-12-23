const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Freelancers } = require("./Freelancer");
const { Clients } = require("./Client");
const Client_Reveiws = sequelize.define("Client_Reveiws", {
    review: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rate: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    FreelacerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
const Freelancer_Reviews = sequelize.define("Freelancer_Reviews", {
    review: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rate: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Freelancers.hasMany(Freelancer_Reviews);
Freelancer_Reviews.belongsTo(Freelancers);
Clients.hasMany(Client_Reveiws);
Client_Reveiws.belongsTo(Clients);

module.exports = Client_Reveiws;
