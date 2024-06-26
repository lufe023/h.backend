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

router.get(
    "/category/:categoryId",
    passport.authenticate("jwt", { session: false }),
    productsServices.getProductsByCategoryIdService
);

router.get(
    "/busqueda/:search",
    passport.authenticate("jwt", { session: false }),
    productsServices.searchProductsService
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

//ruta para borrar un producto de la DB
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    productsServices.deleteProductService
);

module.exports = router;
