const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Students = require("./Student");
const Teachers = require("./Teacher");

// Teacher Notifications Model
const Teacher_Notifications = sequelize.define("Teacher_Notifications", {
    TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Teachers,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unread",
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Student Notifications Model
const Student_Notifications = sequelize.define("Student_Notifications", {
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
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unread",
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Associations for Student Notifications
Student_Notifications.belongsTo(Students, {
    as: "student",
    foreignKey: "StudentId",
});
Students.hasMany(Student_Notifications, {
    as: "Student_Notifications",
    foreignKey: "StudentId",
});

// Associations for Teacher Notifications
Teacher_Notifications.belongsTo(Teachers, {
    as: "teacher",
    foreignKey: "TeacherId",
});
Teachers.hasMany(Teacher_Notifications, {
    as: "Teacher_Notifications",
    foreignKey: "TeacherId",
});

module.exports = { Student_Notifications, Teacher_Notifications };
