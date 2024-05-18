// models/cartItem.models.js
const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Cart = require("./cart.models");
const Product = require("./product.models");

const CartItem = db.define(
    "CartItem",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        cartId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                key: "id",
                model: Cart,
            },
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                key: "id",
                model: Product,
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {}
);

module.exports = CartItem;
