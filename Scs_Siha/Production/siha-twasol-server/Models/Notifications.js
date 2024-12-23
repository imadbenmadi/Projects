const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Malad } = require("./Malad");

// Malad Notifications Model
const Malad_Notifications = sequelize.define("Malad_Notifications", {
    maladId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Malad,
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

// Associations for Malad Notifications
Malad_Notifications.belongsTo(Malad, {
    as: "Malad",
    foreignKey: "maladId",
});
Malad.hasMany(Malad_Notifications, {
    as: "Malad_Notifications",
    foreignKey: "maladId",
});

module.exports = { Malad_Notifications };
