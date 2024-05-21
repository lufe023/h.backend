// models/initModels.js
const Users = require("./users.models");
const Roles = require("./roles.models");
const Products = require("./product.models");
const Order = require("./order.models");
const OrderDetail = require("./orderDetail.models");
const Category = require("./categories.models");
const Cart = require("./cart.models");
const CartItem = require("./cartItem.models");
const List = require("./list.models");
const ListProduct = require("./ListProduct.model");

const initModels = () => {
    Products.hasOne(Category, {
        foreignKey: "id",
        sourceKey: "category",
        as: "categoryDetails",
    });

    Products.belongsTo(Users, {
        foreignKey: "createdBy",
        as: "userDetails",
    });

    Users.belongsTo(Roles, {
        foreignKey: "role",
        as: "roleDetails",
    });

    CartItem.belongsTo(Products, {
        as: "productDetails",
        foreignKey: "productId",
    });
    CartItem.belongsTo(Cart, { foreignKey: "cartId" });
    Cart.belongsTo(Users, { foreignKey: "userId" });
    Cart.hasMany(CartItem, {
        foreignKey: "cartId",
        sourceKey: "id",
        as: "CartItem",
    });

    Users.hasMany(List, { foreignKey: "userId" });
    List.belongsTo(Users, { foreignKey: "userId" });
    List.belongsToMany(Products, {
        through: ListProduct,
        foreignKey: "listId",
    });
    Products.belongsToMany(List, {
        through: ListProduct,
        foreignKey: "productId",
    });

    Order.belongsTo(Users, { foreignKey: "userId" });
    Order.hasMany(OrderDetail, { as: "orderDetails", foreignKey: "orderId" });
    OrderDetail.belongsTo(Order, { foreignKey: "orderId" });
    OrderDetail.belongsTo(Products, { foreignKey: "productId" });
};

module.exports = initModels;
