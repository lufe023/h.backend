//dependencias
const Category = require("../models/categories.models");
const Products = require("../models/product.models");
const uuid = require("uuid");
const { Op } = require("sequelize");

//llamar a todos los productos que existan
const getAllProductsController = async (offset, limit) => {
    const data = await Products.findAndCountAll({
        offset,
        limit,
        include: [
            {
                model: Category,
                as: "categoryDetails",
            },
        ],
    });
    return data;
};

//llamar a un producto
const getProductByIdController = async (id) => {
    const data = await Products.findOne({
        where: {
            id,
        },
        include: [
            {
                model: Category,
                as: "categoryDetails",
            },
        ],
    });
    return data;
};

//controlador para crear un nuevo producto
const createNewProductController = async (data) => {
    const newUser = await Products.create({
        id: uuid.v4(),
        Handle: data.Title.toLowerCase().replace(/\s+/g, "-"),
        Title: data.Title,
        Description: data.Description,
        SKU: data.SKU,
        Grams: data.Grams,
        Stock: data.Stock,
        Price: data.Price,
        ComparePrice: data.ComparePrice,
        Barcode: data.Barcode,
        category: data.category,
        createdBy: data.createdBy,
    });
    return newUser;
};

//Controlador para actualizar un producto
const updateProductController = async (id, data) => {
    const result = await Products.update(data, {
        where: {
            id,
        },
        individualHooks: true,
    });

    return result;
};

//controlador para borrar un producto de la base de datos
const deleteProductController = async (id) => {
    const result = await Products.destroy({
        where: { id },
    });

    return result;
};

// Controlador para obtener productos por categoría ID
const getProductsByCategoryIdController = async (categoryId, offset, limit) => {
    const data = await Products.findAndCountAll({
        where: { category: categoryId },
        offset,
        limit,
        include: [
            {
                model: Category,
                as: "categoryDetails",
            },
        ],
    });
    return data;
};

// Controlador para buscar productos por título o descripción
const searchProductsController = async (searchTerm, offset, limit) => {
    const data = await Products.findAndCountAll({
        where: {
            [Op.or]: [
                { Title: { [Op.iLike]: `%${searchTerm}%` } },
                { Description: { [Op.iLike]: `%${searchTerm}%` } },
            ],
        },
        offset,
        limit,
        include: [
            {
                model: Category,
                as: "categoryDetails",
            },
        ],
    });
    return data;
};

module.exports = {
    getAllProductsController,
    getProductByIdController,
    createNewProductController,
    updateProductController,
    deleteProductController,
    getProductsByCategoryIdController,
    searchProductsController,
};
