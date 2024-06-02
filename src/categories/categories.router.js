const router = require("express").Router();
const passport = require("passport");
const categoriesServives = require("./categories.services");

//esta es la ruta para ver todas las categories en el sistema
//? myserver/api/v1/products/categories?offset=0&limit=50
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    categoriesServives.getAllCategoriesService
);

//Encontrar una Categoria por ID
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    categoriesServives.getCategoryByIdService
);

//? Crear una nueva Categoria
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    categoriesServives.createNewCategoryService
);

//actualizar una Categoria
router.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    categoriesServives.patchCategoryService
);

//Eliminar una Categoria
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    categoriesServives.deleteCategoryService
);

module.exports = router;
