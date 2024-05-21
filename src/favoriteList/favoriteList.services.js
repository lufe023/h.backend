const listControllers = require("./favoriteList.controllers");

// Servicio para agregar un producto a la lista "Favorites"
const addProductToFavoriteListService = (req, res) => {
    const { userId, productId } = req.body;

    listControllers
        .addProductToFavoriteListController(userId, productId)
        .then((data) => {
            if (data.message) {
                res.status(400).json(data);
            } else {
                res.status(201).json(data);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
};

// Servicio para obtener los productos en la lista "Favorites"
const getProductsInFavoritesListService = (req, res) => {
    const userId = req.params.userId;

    listControllers
        .getProductsInFavoritesListController(userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
};

// Servicio para eliminar un producto de la lista "Favorites"
const removeProductFromFavoritesListService = (req, res) => {
    const { userId, productId } = req.query;

    if (userId && productId) {
        listControllers
            .removeProductFromFavoritesListController(userId, productId)
            .then((data) => {
                res.status(204).json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    } else {
        res.status(400).json({ message: "userId y productId son requeridos." });
    }
};

module.exports = {
    addProductToFavoriteListService,
    getProductsInFavoritesListService,
    removeProductFromFavoritesListService,
};
