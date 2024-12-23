const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");

const Blog = sequelize.define("Blog", {
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
        allowNull: false, // No foreign key constraint
    },
    ownerType: {
        type: DataTypes.STRING, // "Doctor", "Worker", or "Director"
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
Blog.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(Blog, { foreignKey: "companyId" });

module.exports = { Blog };
