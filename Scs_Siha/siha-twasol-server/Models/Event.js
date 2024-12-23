const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");

const Event = sequelize.define("Event", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // No foreign key constraint here
    },
    ownerType: {
        type: DataTypes.STRING, // This will be "Doctor", "Worker", or "Director"
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: "id",
        },
    },
});

// Only keep the Company association
Event.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(Event, { foreignKey: "companyId" });

module.exports = { Event };
