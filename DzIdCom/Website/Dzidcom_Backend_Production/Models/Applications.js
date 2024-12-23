const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Freelancers } = require("./Freelnacer");
const { Projects } = require("./Project");

const Applications = sequelize.define("Applications", {
    FreelancerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ProjectTitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ProjectDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
    },
    Freelancer_Time_Needed: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Freelancer_Budget: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Freelancers.hasMany(Applications, {
    as: "Applications",
    foreignKey: "FreelancerId",
});
Applications.belongsTo(Freelancers, {
    as: "Freelancer",
    foreignKey: "FreelancerId",
});

Projects.hasMany(Applications, { as: "Applications", foreignKey: "ProjectId" });
Applications.belongsTo(Projects, { as: "Project", foreignKey: "ProjectId" });

module.exports = { Applications };
