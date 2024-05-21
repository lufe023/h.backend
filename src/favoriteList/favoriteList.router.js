const router = require("express").Router();
const passport = require("passport");
const listServices = require("./favoriteList.services");

// Agregar un producto a la lista "Favorites"
router.post(
    "/add-product",
    passport.authenticate("jwt", { session: false }),
    listServices.addProductToFavoriteListService
);

// Obtener productos en la lista "Favorites"
router.get(
    "/:userId/products",
    passport.authenticate("jwt", { session: false }),
    listServices.getProductsInFavoritesListService
);

// Eliminar un producto de la lista "Favorites"
router.delete(
    "/remove-product",
    passport.authenticate("jwt", { session: false }),
    listServices.removeProductFromFavoritesListService
);

module.exports = router;
