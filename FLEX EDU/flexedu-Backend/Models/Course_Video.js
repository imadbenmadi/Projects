const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Courses = require("./Course");

const Course_Video = sequelize.define("Course_Video", {
  Title: {
    type: DataTypes.STRING,
    allowNull: true,
    default: "No Title",
  },
  Video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Duration: {
    type: DataTypes.STRING,
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
  Course_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Course_Video.belongsTo(Courses, {
  foreignKey: "CourseId",
  onDelete: "CASCADE",
});
Courses.hasMany(Course_Video, { foreignKey: "CourseId" });

module.exports = Course_Video;
