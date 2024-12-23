const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Company = sequelize.define("Company", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Wilaya: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
const Service = sequelize.define("Service", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Company.hasMany(Service, { foreignKey: "companyId", as: "Services" });
Service.belongsTo(Company, { foreignKey: "companyId" });
module.exports = { Company, Service };
