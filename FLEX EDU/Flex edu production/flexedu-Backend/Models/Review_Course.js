const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
// const Teachers = require("./Teacher");
const Students = require("./Student");
const Courses = require("./Course");
const Reviews = sequelize.define("Reviews", {
    CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Courses,
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

// Setting up associations with Courses and Students
Reviews.belongsTo(Courses, { foreignKey: "CourseId", onDelete: "CASCADE" });
Courses.hasMany(Reviews, { foreignKey: "CourseId" });

Reviews.belongsTo(Students, { foreignKey: "StudentId", onDelete: "CASCADE" });
Students.hasMany(Reviews, { foreignKey: "StudentId" });

module.exports = Reviews;
