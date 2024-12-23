const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Clients } = require("./Client");
const { Freelancers } = require("./Freelnacer");
const Projects = sequelize.define("Projects", {
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    FreelancerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Pyament_ScreenShot_Link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    work_Link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Money: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    DeadLine: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
    },

    Field_is_Graphic_design: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },
    Field_is_Content_creation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },
    Field_is_SEO_SIM: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },

    Expected_Time: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Client_Budget: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Frelancer_Experiance: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    Client_CCP_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isProjectDone: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },
    isWorkRejected: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },
    isPayment_ScreenShot_Rejected: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },
    isPayment_ScreenShot_uploaded: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },

    // isPayment_ScreenShot_Accepted: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: true,
    //     default: false,
    // },
    isWorkUploaded: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },
    isCleint_send_Feedback: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },
    isFreelancer_send_Feedback: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },
});

Projects.belongsTo(Clients, { as: "owner", foreignKey: "ClientId" });
Clients.hasMany(Projects, { as: "Projects", foreignKey: "ClientId" });

Projects.belongsTo(Freelancers, {
    as: "Freelancer",
    foreignKey: "FreelancerId",
});
Freelancers.hasMany(Projects, { as: "Projects", foreignKey: "FreelancerId" });



module.exports = { Projects };
