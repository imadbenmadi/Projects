const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Privacy = sequelize.define("Privacy", {
    Content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
module.exports = { Privacy };
