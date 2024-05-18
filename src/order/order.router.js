// routes/order.routes.js

const router = require("express").Router();
const passport = require("passport");
const orderServices = require("./order.services");

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    orderServices.createOrderService
);
router.get(
    "/:orderId",
    passport.authenticate("jwt", { session: false }),
    orderServices.getOrderService
);
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    orderServices.getUserOrdersService
);
router.put(
    "/:orderId/status",
    passport.authenticate("jwt", { session: false }),
    orderServices.updateOrderStatusService
);

module.exports = router;
