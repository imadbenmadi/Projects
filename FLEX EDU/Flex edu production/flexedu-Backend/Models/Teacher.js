const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Teachers = sequelize.define("Teachers", {
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
    CCP_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
});

module.exports = Teachers;
