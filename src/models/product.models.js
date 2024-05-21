const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Category = require("./categories.models");
const Users = require("./users.models");

const Product = db.define(
    "Product",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        Handle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.TEXT, // Campo para guardar la descripción como texto
            allowNull: true,
        },
        SKU: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Grams: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        ComparePrice: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: "Compare_Price",
        },
        Barcode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: "id",
                model: Category,
            },
        },
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false,
            // references: { comentado para evitar errores de dependencia circular
            //     key: "id",
            //     model: Users,
            // },
        },
    },

    {
        hooks: {
            // Hook que se ejecuta antes de guardar o actualizar un producto
            beforeSave: async (product) => {
                if (product.changed("Title")) {
                    product.Handle = product.Title.toLowerCase().replace(
                        /\s+/g,
                        "-"
                    );
                }
            },
        },
    }
);

module.exports = Product;
