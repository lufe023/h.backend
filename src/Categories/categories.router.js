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

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    categoriesServives.createNewCategoryService
);
module.exports = router;
