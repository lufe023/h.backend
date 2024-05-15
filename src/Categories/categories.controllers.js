const Categories = require("../models/categories.models");
const uuid = require("uuid");
//llamar a todos los productos que existan
const getAllCategoriesController = async (offset, limit) => {
    const data = await Categories.findAndCountAll({
        offset,
        limit,
    });
    return data;
};

//controlador para crear un nuevo producto
const createNewCategoryController = async (data) => {
    const newUser = await Categories.create({
        name: data.name,
        parent: data.parent || 0,
        description: data.description,
    });
    return newUser;
};
module.exports = {
    getAllCategoriesController,
    createNewCategoryController,
};
