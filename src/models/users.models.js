const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Roles = require("./roles.models");
const { createFavoriteList } = require("../utils/createFavoriteList ");
const uuid = require("uuid");

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
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     key: "id",
            //     model: Roles,
            // },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "active", //active, suspended, locked
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
            // Agregar algunos índices para mejorar el rendimiento de la DB
            {
                fields: ["id", "email", "role"],
            },
        ],
        hooks: {
            afterCreate: async (user, options) => {
                await createFavoriteList(user.id);
            },
        },
    }
);

module.exports = Users;
