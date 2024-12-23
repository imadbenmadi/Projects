const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Refresh_tokens = sequelize.define("Refresh_tokens", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports = { Refresh_tokens };
