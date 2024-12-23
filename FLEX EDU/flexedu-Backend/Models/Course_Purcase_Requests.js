const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Students = require("./Student");
const Courses = require("./Course");

const Course_Purcase_Requests = sequelize.define("Course_Purcase_Requests", {
    Price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    screenShot: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Courses,
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

Course_Purcase_Requests.belongsTo(Students, {
    foreignKey: "StudentId",
    onDelete: "CASCADE",
});
Students.hasMany(Course_Purcase_Requests, { foreignKey: "StudentId" });

Course_Purcase_Requests.belongsTo(Courses, {
    foreignKey: "CourseId",
    onDelete: "CASCADE",
});
Courses.hasMany(Course_Purcase_Requests, { foreignKey: "CourseId" });

module.exports = Course_Purcase_Requests;
