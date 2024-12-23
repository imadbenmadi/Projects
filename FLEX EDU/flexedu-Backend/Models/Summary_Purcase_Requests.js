const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Students = require("./Student");
const Summaries = require("./Summary");
const Summary_Purcase_Requests = sequelize.define("Summary_Purcase_Requests", {
    Price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    screenShot: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    SummaryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Summaries,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Students,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending",
    },
    CCP_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Summary_Purcase_Requests.belongsTo(Students, {
    foreignKey: "StudentId",
    onDelete: "CASCADE",
});
Students.hasMany(Summary_Purcase_Requests, { foreignKey: "StudentId" });

Summary_Purcase_Requests.belongsTo(Summaries, {
    foreignKey: "SummaryId",
    onDelete: "CASCADE",
});
Summaries.hasMany(Summary_Purcase_Requests, { foreignKey: "SummaryId" });

module.exports = Summary_Purcase_Requests;
