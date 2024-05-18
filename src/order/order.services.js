// services/order.services.js
const orderControllers = require("./order.controllers");

const createOrderService = async (req, res) => {
    const { paymentMethod, shippingAddress } = req.body;
    const userId = req.user.id;

    try {
        const order = await orderControllers.createOrderController(
            userId,
            paymentMethod,
            shippingAddress
        );
        res.status(201).json(order);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

const getOrderService = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const order = await orderControllers.getOrderController(orderId);
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getUserOrdersService = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await orderControllers.getUserOrdersController(userId);
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateOrderStatusService = async (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;

    try {
        await orderControllers.updateOrderStatusController(orderId, status);
        res.status(200).json({ message: "Estado de la orden actualizado" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createOrderService,
    getOrderService,
    getUserOrdersService,
    updateOrderStatusService,
};
