const Category = require("../models/categories.models");
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

//Controlador para actualizar un Categoria
const updateCategoryController = async (id, data) => {
    const result = await Categories.update(data, {
        where: {
            id,
        },
    });

    return result;
};

//controlador para borrar una categoría
const deleteCategoryController = async (id) => {
    const result = await Category.destroy({
        where: { id },
    });
    return result;
};

module.exports = {
    getAllCategoriesController,
    createNewCategoryController,
    updateCategoryController,
    deleteCategoryController,
};
