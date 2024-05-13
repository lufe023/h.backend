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
            type: DataTypes.ARRAY(DataTypes.STRING), // Aquí especificamos que Description será un array de strings
            allowNull: true,
        },
        longDescription: {
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
            references: {
                key: "id",
                model: Users,
            },
        },
    },
    {
        hooks: {
            // Hook que se ejecuta antes de guardar un producto
            beforeSave: async (product) => {
                try {
                    // Verifica si el campo Description ha cambiado
                    if (product.changed("Description")) {
                        // Convierte el array de Description a texto y lo guarda en longDescription
                        product.longDescription = product.Description.join(" ");
                    }
                } catch (error) {
                    console.error(
                        "Error al guardar la descripción como texto:",
                        error
                    );
                    throw error;
                }
            },
        },
    }
);

module.exports = Product;
