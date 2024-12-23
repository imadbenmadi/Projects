const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
const { Service } = require("./Company");
const Malad = sequelize.define("Malad", {
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
    birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    about: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profile_pic_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
const malad_follow = sequelize.define("malad_follow", {
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Malad.hasMany(malad_follow, { foreignKey: "patientId" });



Company.hasMany(malad_follow, { foreignKey: "companyId", as: "malad_follows" });
malad_follow.belongsTo(Company, { foreignKey: "companyId" });
malad_follow.belongsTo(Malad, { foreignKey: "patientId" });

module.exports = { Malad, malad_follow };
