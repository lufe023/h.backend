const router = require("express").Router();
const passport = require("passport");
const listServices = require("./list.services");

// Crear una nueva lista
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    listServices.createListService
);

// Agregar un producto a la lista
router.post(
    "/addProduct",
    passport.authenticate("jwt", { session: false }),
    listServices.addProductToListService
);

// Obtener productos en una lista
router.get(
    "/:id/products",
    passport.authenticate("jwt", { session: false }),
    listServices.getProductsInListService
);

// Eliminar un producto de una lista
router.delete(
    "/removeProduct",
    passport.authenticate("jwt", { session: false }),
    listServices.removeProductFromListService
);

// Eliminar una lista
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    listServices.deleteListService
);

module.exports = router;
