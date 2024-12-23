const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Courses = require("./Course");

const Course_Meets = sequelize.define("Course_Meets", {
    Link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Courses, // Ensure the model name matches the table name
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
});

Course_Meets.belongsTo(Courses, {
    foreignKey: "CourseId",
    onDelete: "CASCADE",
});
Courses.hasMany(Course_Meets, { foreignKey: "CourseId" });

module.exports = Course_Meets;
