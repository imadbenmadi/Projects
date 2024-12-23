const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Teachers = require("./Teacher");

const Summary = sequelize.define("Summary", {
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
    file_link: {
        type: DataTypes.STRING,
        allowNull: false,
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
    Pages_Count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    Rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
});

Summary.belongsTo(Teachers, { foreignKey: "TeacherId", onDelete: "CASCADE" });
Teachers.hasMany(Summary, { foreignKey: "TeacherId" });

module.exports = Summary;
