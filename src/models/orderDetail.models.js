const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Order = require("./order.models");
const Product = require("./product.models");

const OrderDetail = db.define("OrderDetail", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: "id",
        },
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        // references: {
        //     key: "id",
        //     model: Product,
        // },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = OrderDetail;
