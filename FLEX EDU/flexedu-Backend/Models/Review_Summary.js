const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
// const Teachers = require("./Teacher");
const Students = require("./Student");
const Summary = require("./Summary");
const Review_Summary = sequelize.define("Review_Summary", {
    SummaryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Summary,
            key: "id",
        },
        onDelete: "CASCADE", // Ensure cascading deletes if a teacher is deleted
        onUpdate: "CASCADE", // If teacher's id changes, update references
    },
    StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Students,
            key: "id",
        },
        onDelete: "CASCADE", // Ensure cascading deletes if a student is deleted
        onUpdate: "CASCADE", // If student's id changes, update references
    },
    Comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
});

// Setting up associations with Summary and Students
Review_Summary.belongsTo(Summary, {
    foreignKey: "SummaryId",
    onDelete: "CASCADE",
});
Summary.hasMany(Review_Summary, { foreignKey: "SummaryId" });

Review_Summary.belongsTo(Students, {
    foreignKey: "StudentId",
    onDelete: "CASCADE",
});
Students.hasMany(Review_Summary, { foreignKey: "StudentId" });

module.exports = Review_Summary;
