const db = require("../utils/database");

const { DataTypes } = require("sequelize");
const Roles = require("./roles.models");

const Users = db.define(
    "users",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "first_name",
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "last_name",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING, // +52
            allowNull: true,
            unique: true,
        },

        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: "id",
                model: Roles,
            },
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "active", //active, suspended, looked
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: "is_verified",
            defaultValue: false,
        },
        passwordRequest: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        indexes: [
            // Vamos agregar algunos indices para que nuestra DB vaya un poco mas rapida
            {
                fields: ["id", "email", "role"],
            },
            // ... (otros índices)
        ],
    }
);

module.exports = Users;
