const uuid = require("uuid");
const ListProduct = require("../models/ListProduct.model");
const List = require("../models/list.models");
const Product = require("../models/product.models");

const createListController = async (userId, listName, type) => {
    //controllador para crear una lista
    return await List.create({ userId, listName, type });
};

//controlador para agregar un producto a la lista
const addProductToListController = async (listId, productId) => {
    // Verificar si el producto ya existe en la lista
    const existingListProduct = await ListProduct.findOne({
        where: {
            listId: listId,
            productId: productId,
        },
    });

    if (existingListProduct) {
        // Si el producto ya está en la lista, retornar un mensaje o manejarlo según tu lógica de negocio
        return { message: "El producto ya está en la lista." };
    } else {
        // Si el producto no está en la lista, agregarlo
        const newListProduct = await ListProduct.create({ listId, productId });
        return newListProduct;
    }
};

//Obtener Productos en una Lista
const getProductsInListController = async (listId) => {
    return await List.findByPk(listId, {
        include: [{ model: Product, through: { attributes: [] } }],
    });
};

//quitar un producto de la lista
const removeProductFromListController = async (listId, productId) => {
    return await ListProduct.destroy({ where: { listId, productId } });
};

// Eliminar una lista y sus productos asociados
const deleteListController = async (listId) => {
    try {
        await List.destroy({ where: { id: listId } });
        // También podrías eliminar productos asociados si no se manejan con CASCADE
        await ListProduct.destroy({ where: { listId: listId } });
        return { message: "Lista eliminada exitosamente." };
    } catch (error) {
        console.error("Error deleting list:", error);
        throw new Error("Error deleting list");
    }
};

module.exports = {
    createListController,
    addProductToListController,
    getProductsInListController,
    removeProductFromListController,
    deleteListController,
};
