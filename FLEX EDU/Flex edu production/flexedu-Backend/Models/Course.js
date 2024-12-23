const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Teachers = require("./Teacher");

const Courses = sequelize.define("Courses", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    Category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Teachers, // Ensure the model name matches the table name
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    Students_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    // Vedios_count: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     defaultValue: 0,
    // },
    Rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
});

Courses.belongsTo(Teachers, { foreignKey: "TeacherId", onDelete: "CASCADE" });
Teachers.hasMany(Courses, { foreignKey: "TeacherId" });

module.exports = Courses;
