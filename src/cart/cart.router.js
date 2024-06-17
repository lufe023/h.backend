const router = require("express").Router();
const passport = require("passport");
const cartServices = require("./cart.services");

// Ruta para crear un nuevo carrito
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    cartServices.createCartService
);

// Ruta para agregar un producto al carrito
router.post(
    "/:cartId/products",
    passport.authenticate("jwt", { session: false }),
    cartServices.addProductToCartService
);
// Ruta para obtener los productos del carrito
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    cartServices.getCartByUserService
);

// Ruta para obtener los productos del carrito
router.get(
    "/:cartId/products",
    passport.authenticate("jwt", { session: false }),
    cartServices.getCartItemsService
);

// Ruta para eliminar un producto del carrito
router.delete(
    "/products/:cartItemId",
    passport.authenticate("jwt", { session: false }),
    cartServices.removeProductFromCartService
);

// Ruta para vaciar el carrito
router.delete(
    "/:cartId",
    passport.authenticate("jwt", { session: false }),
    cartServices.clearCartService
);

router.patch(
    "/products/:cartItemId",
    passport.authenticate("jwt", { session: false }),
    cartServices.updateCartItemQuantityService
);

module.exports = router;
