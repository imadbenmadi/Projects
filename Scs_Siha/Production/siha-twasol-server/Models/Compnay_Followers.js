const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

// Updated Company_Followers model to reflect follow relationship between Malad and Company
const Company_Followers = sequelize.define(
    "Company_Followers",
    {
        maladId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

module.exports = { Company_Followers };
