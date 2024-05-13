const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Roles = db.define(
    "user_roles",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },

        roleName: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "role_name",
        },
        //los niveles de usuario deberian ir desde 1 hasta donde considere
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Roles;
