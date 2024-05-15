const Users = require("./users.models");
const Roles = require("./roles.models");
const Products = require("./product.models");
const Order = require("./order.models");
const OrderDetail = require("./orderDetail.models");
const Category = require("./categories.models");

const initModels = () => {
    // Products.hasOne(Category);
    Products.hasOne(Category, {
        foreignKey: "id",
        sourceKey: "category",
        as: "categoryDetails",
    });
};

module.exports = initModels;
