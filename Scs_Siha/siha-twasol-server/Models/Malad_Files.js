const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Doctor } = require("./Doctor");
const { Malad } = require("./Malad");

const Malad_Files = sequelize.define("Malad_Files", {
    Title: {
        type: DataTypes.STRING,
        allowNull: true,
        default: "No Title",
    },
    file_link: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    maladId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Malad_Files.belongsTo(Malad, {
    foreignKey: "maladId",
    onDelete: "CASCADE",
});
Malad.hasMany(Malad_Files, { foreignKey: "maladId" });
Malad_Files.belongsTo(Doctor, {
    foreignKey: "doctorId",
    onDelete: "CASCADE",
});
Doctor.hasMany(Malad_Files, { foreignKey: "doctorId" });

module.exports = { Malad_Files };
