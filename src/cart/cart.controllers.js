// controllers/cart.controllers.js
const Cart = require("../models/cart.models");
const CartItem = require("../models/cartItem.models");
const Product = require("../models/product.models");
const uuid = require("uuid");

const createCartController = async (userId) => {
    return await Cart.create({ id: uuid.v4(), userId });
};

const addProductToCartController = async (cartId, productId, quantity) => {
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new Error("Producto no encontrado");
    }
    const existingCartItem = await CartItem.findOne({
        where: {
            cartId: cartId,
            productId: productId,
        },
    });

    if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save({ individualHooks: true });
        return existingCartItem;
    } else {
        const newCartItem = await CartItem.create(
            {
                id: uuid.v4(),
                cartId: cartId,
                productId: productId,
                quantity: quantity,
                price: product.Price,
            },
            { individualHooks: true }
        );
        return newCartItem;
    }
};

const updateCartItemQuantityController = async (cartItemId, newQuantity) => {
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
        throw new Error("El producto no se encuentra en el carrito.");
    }

    cartItem.quantity = newQuantity;
    await cartItem.save({ individualHooks: true });

    return cartItem;
};

const getCartItemsController = async (cartId) => {
    return await CartItem.findAll({
        where: { cartId },
        include: [{ model: Product, as: "productDetails" }],
    });
};

const getCartByUser = async (userId) => {
    const cart = await Cart.findOne({
        where: {
            userId,
        },
        include: [
            {
                model: CartItem,
                as: "CartItem",
                include: [{ model: Product, as: "productDetails" }],
            },
        ],
    });

    return cart;
};

const removeProductFromCartController = async (cartItemId) => {
    return await CartItem.destroy({
        where: { id: cartItemId },
        individualHooks: true,
    });
};

const clearCartController = async (cartId) => {
    return await CartItem.destroy({ where: { cartId }, individualHooks: true });
};

module.exports = {
    createCartController,
    addProductToCartController,
    updateCartItemQuantityController,
    getCartItemsController,
    getCartByUser,
    removeProductFromCartController,
    clearCartController,
};
