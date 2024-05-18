// controllers/order.controllers.js
const Order = require("../models/order.models");
const OrderDetail = require("../models/orderDetail.models");
const CartItem = require("../models/cartItem.models");
const Cart = require("../models/cart.models");
const uuid = require("uuid");
const { clearCartController } = require("../Cart/cart.controllers");

const createOrderController = async (
    userId,
    paymentMethod,
    shippingAddress
) => {
    // Obtener los elementos del carrito para el usuario
    const cartItems = await Cart.findOne({
        where: { userId, status: "active" },
        include: [
            {
                model: CartItem,
                as: "CartItem",
            },
        ],
    });

    if (cartItems.CartItem.length === 0) {
        throw new Error("El carrito está vacío");
    }

    // Calcular el precio total
    const totalPrice = cartItems.CartItem.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);

    // Crear la orden
    const order = await Order.create({
        id: uuid.v4(),
        userId,
        status: "pendiente",
        totalPrice,
        paymentMethod,
        shippingAddress,
        paidAt: new Date(),
    });

    // Crear los detalles de la orden
    for (const item of cartItems.CartItem) {
        await OrderDetail.create({
            id: uuid.v4(),
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        });
    }

    // Limpiar el carrito (o actualizar su estado)
    await clearCartController(cartItems.id);
    return order;
};
const getOrderController = async (orderId) => {
    return await Order.findOne({
        where: { id: orderId },
        include: [
            {
                model: OrderDetail,
                as: "orderDetails",
            },
        ],
    });
};

const getUserOrdersController = async (userId) => {
    return await Order.findAll({
        where: { userId },
        include: [
            {
                model: OrderDetail,
                as: "orderDetails",
            },
        ],
    });
};

const updateOrderStatusController = async (orderId, status) => {
    return await Order.update({ status }, { where: { id: orderId } });
};

module.exports = {
    createOrderController,
    getOrderController,
    getUserOrdersController,
    updateOrderStatusController,
};
