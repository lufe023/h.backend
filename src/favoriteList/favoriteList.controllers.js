const uuid = require("uuid");
const ListProduct = require("../models/ListProduct.model");
const List = require("../models/list.models");
const Product = require("../models/product.models");

// Helper function to get the Favorites list of a user
const getFavoritesList = async (userId) => {
    return await List.findOne({
        where: {
            userId: userId,
            type: "Favorites",
        },
    });
};

// Controlador para agregar un producto a la lista "Favorites"
const addProductToFavoriteListController = async (userId, productId) => {
    // Obtener la lista "Favorites" del usuario
    const favoritesList = await getFavoritesList(userId);

    if (!favoritesList) {
        throw new Error(
            "No se encontró la lista 'Favorites' para este usuario."
        );
    }

    const listId = favoritesList.id;

    // Verificar si el producto ya existe en la lista
    const existingListProduct = await ListProduct.findOne({
        where: {
            listId: listId,
            productId: productId,
        },
    });

    if (existingListProduct) {
        return { message: "El producto ya está en la lista." };
    } else {
        const newListProduct = await ListProduct.create({ listId, productId });
        return newListProduct;
    }
};

// Obtener productos en la lista "Favorites"
const getProductsInFavoritesListController = async (userId) => {
    const favoritesList = await getFavoritesList(userId);

    if (!favoritesList) {
        throw new Error(
            "No se encontró la lista 'Favorites' para este usuario."
        );
    }

    return await List.findByPk(favoritesList.id, {
        include: [{ model: Product, through: { attributes: [] } }],
    });
};

// Quitar un producto de la lista "Favorites"
const removeProductFromFavoritesListController = async (userId, productId) => {
    const favoritesList = await getFavoritesList(userId);

    if (!favoritesList) {
        throw new Error(
            "No se encontró la lista 'Favorites' para este usuario."
        );
    }

    return await ListProduct.destroy({
        where: { listId: favoritesList.id, productId },
    });
};

module.exports = {
    addProductToFavoriteListController,
    getProductsInFavoritesListController,
    removeProductFromFavoritesListController,
};
