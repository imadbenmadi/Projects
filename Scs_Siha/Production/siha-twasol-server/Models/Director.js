const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
const Director = sequelize.define("Director", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Company.hasMany(Director, { foreignKey: "companyId", as: "Directors" });
Director.belongsTo(Company, { foreignKey: "companyId" });

module.exports = { Director };
