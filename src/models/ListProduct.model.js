const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Products = require("./product.models");
const List = require("./list.models");

const ListProduct = db.define("ListProduct", {
    listId: {
        type: DataTypes.UUID,
        // references: {
        //     model: List,
        //     key: "id",
        // },
    },
    productId: {
        type: DataTypes.UUID,
        // references: {
        //     model: Products,
        //     key: "id",
        // },
    },
});

module.exports = ListProduct;
