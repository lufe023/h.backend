// models/cart.models.js
const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Users = require("./users.models");

const Cart = db.define(
    "Cart",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            // references: {
            //     key: "id",
            //     model: Users,
            // },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "active", // Puede ser "active", "completed", "cancelled"
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
        },
    },
    {}
);

module.exports = Cart;
