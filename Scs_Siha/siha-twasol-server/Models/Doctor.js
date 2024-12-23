const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
const { Service } = require("./Company");
const { Malad } = require("./Malad");
const Doctor = sequelize.define("Doctor", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    speciality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    profile_pic_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
const Doctor_Malads = sequelize.define("Doctor_Malads", {
    maladId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Doctor.hasMany(Doctor_Malads, { foreignKey: "doctorId" });
Doctor_Malads.belongsTo(Doctor, { foreignKey: "doctorId" });
Malad.hasMany(Doctor_Malads, { foreignKey: "maladId" });
Doctor_Malads.belongsTo(Malad, { foreignKey: "maladId" });

Company.hasMany(Doctor, { foreignKey: "companyId", as: "Doctors" });
Doctor.belongsTo(Company, { foreignKey: "companyId" });

Service.hasMany(Doctor, { foreignKey: "serviceId", as: "Doctors" });
Doctor.belongsTo(Service, { foreignKey: "serviceId" });
module.exports = { Doctor, Doctor_Malads };
