const router = require("express").Router();
const passport = require("passport");
const productsServices = require("./products.services");

//esta ruta para ver todos los usuarios la protegemos primero con un token y luego con el nivel del rol del usuario
//? myserver/api/v1/products?offset=0&limit=50
router
    .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        productsServices.getAllProductsService
    )

    //? myserver/api/v1/products/:id

    .route("/:id")
    .get(
        passport.authenticate("jwt", { session: false }),
        productsServices.getProductByIdService
    );

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    productsServices.createNewProductService
);

//actualizar un producto existente

router.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    productsServices.patchProductService
);

module.exports = router;
