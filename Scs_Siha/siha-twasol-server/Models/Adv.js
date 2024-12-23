const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
const Adv = sequelize.define("Adv", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Adv.belongsTo(Company, { foreignKey: "companyId" });

module.exports = { Adv };
