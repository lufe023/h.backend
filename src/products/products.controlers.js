//dependencias
const Category = require("../models/categories.models");
const Products = require("../models/product.models");
const uuid = require("uuid");

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
module.exports = {
    getAllProductsController,
    getProductByIdController,
    createNewProductController,
    updateProductController,
};
