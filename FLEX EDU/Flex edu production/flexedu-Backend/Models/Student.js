const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Students = sequelize.define("Students", {
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
    profile_pic_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Students;
