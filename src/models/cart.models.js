const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Users = require("./users.models");
const Product = require("./product.models");

const Cart = db.define("Cart", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: "id",
            model: Users,
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
        defaultValue: 1,
    },
});

module.exports = Cart;
