const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Users = require("./users.models");

const List = db.define(
    "list",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        listName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                key: "id",
                model: Users,
            },
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "customized", //Favorites, customized, lo usamos para diferenciar cundo es una lista definida por los administradores de sistema o personalizada por el usuario customized
        },
    },
    {}
);

module.exports = List;
