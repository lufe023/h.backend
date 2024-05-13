const router = require("express").Router();
const passport = require("passport");
const adminValidate = require("../middlewares/role.middleware");
const userServices = require("./users.services");

require("../middlewares/auth.middleware")(passport);

//? rutas raiz
router.get("/", userServices.getAllUsers);

//? Ruta de informacion propia del usuario loggeado
router
    .route("/me")
    .get(
        passport.authenticate("jwt", { session: false }),
        userServices.getMyUser
    )
    .patch(
        passport.authenticate("jwt", { session: false }),
        userServices.patchMyUser
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        userServices.deleteMyUser
    );

//? /api/v1/users/:id
router
    .route("/:id")
    .get(userServices.getUserById)
    .patch(
        passport.authenticate("jwt", { session: false }),
        adminValidate,
        userServices.patchUser
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        adminValidate,
        userServices.deleteUser
    );

//? /api/v1/users/passwordRequest
router.route("/passwordRequest").post(userServices.requestResetPasswordService);
router
    .route("/passwordRequest/:idRequest")
    .patch(userServices.changeThePasswordServices);

module.exports = router;
