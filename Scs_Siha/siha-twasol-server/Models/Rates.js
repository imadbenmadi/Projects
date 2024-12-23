const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Malad } = require("./Malad");
const { Doctor } = require("./Doctor");
const Malad_Rates = sequelize.define("Malad_Rates", {
    maladId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    review: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
const Doctor_Rates = sequelize.define("Doctor_Rates", {
    maladId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    review: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
Malad.hasMany(Malad_Rates, { foreignKey: "maladId" });
Doctor.hasMany(Doctor_Rates, { foreignKey: "doctorId" });
Malad.hasMany(Doctor_Rates, { foreignKey: "maladId" });
Doctor.hasMany(Malad_Rates, { foreignKey: "doctorId" });

Malad_Rates.belongsTo(Malad, { foreignKey: "maladId" });
Malad_Rates.belongsTo(Doctor, { foreignKey: "doctorId" });
Doctor_Rates.belongsTo(Malad, { foreignKey: "maladId" });
Doctor_Rates.belongsTo(Doctor, { foreignKey: "doctorId" });

module.exports = { Malad_Rates, Doctor_Rates };
