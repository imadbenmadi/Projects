const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Students = require("./Student");
const Courses = require("./Course");

const Course_Progress = sequelize.define("Course_Progress", {
  StudentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Students, // Ensure the model name matches the table name
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
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
  Course_Videos_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Set a default value if applicable
  },
  Progress: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0, // Set a default value if applicable
  },
  WatchedVideos: {
    type: DataTypes.JSON, // Use JSON to store the list of video IDs
    allowNull: false,
    defaultValue: [], // Default value is an empty array
  },
});

Course_Progress.belongsTo(Students, {
  foreignKey: "StudentId",
  onDelete: "CASCADE",
});
Students.hasMany(Course_Progress, { foreignKey: "StudentId" });

module.exports = Course_Progress;
