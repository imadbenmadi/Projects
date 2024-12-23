const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Clients = sequelize.define("Clients", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    nationalCardNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    company_Name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company_WorkField: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company_about: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    company_Website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company_creationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    company_Adress: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    instgram_Link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedIn_Link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    facebook_Link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profile_pic_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
});

module.exports = { Clients };
