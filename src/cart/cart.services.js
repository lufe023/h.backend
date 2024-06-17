// services/cart.services.js
const cartControllers = require("./cart.controllers");

const createCartService = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await cartControllers.createCartController(userId);
        res.status(201).json(cart);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const addProductToCartService = async (req, res) => {
    const { productId, quantity } = req.body;
    const cartId = req.params.cartId;
    try {
        const cartItem = await cartControllers.addProductToCartController(
            cartId,
            productId,
            quantity
        );
        res.status(201).json(cartItem);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

const updateCartItemQuantityService = async (req, res) => {
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;

    cartControllers
        .updateCartItemQuantityController(cartItemId, quantity)
        .then((updatedCartItem) => {
            res.status(200).json(updatedCartItem);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

const getCartItemsService = async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const items = await cartControllers.getCartItemsController(cartId);
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getCartByUserService = async (req, res) => {
    const userId = req.user.id;
    try {
        const items = await cartControllers.getCartByUser(userId);
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const removeProductFromCartService = async (req, res) => {
    const cartItemId = req.params.cartItemId;
    try {
        await cartControllers.removeProductFromCartController(cartItemId);
        res.status(204).json({ message: "Producto eliminado del carrito" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const clearCartService = async (req, res) => {
    const cartId = req.params.cartId;
    try {
        await cartControllers.clearCartController(cartId);
        res.status(204).json({ message: "Carrito vaciado" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createCartService,
    addProductToCartService,
    updateCartItemQuantityService,
    getCartItemsService,
    getCartByUserService,
    removeProductFromCartService,
    clearCartService,
};
