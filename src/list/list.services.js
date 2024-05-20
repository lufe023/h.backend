const listControllers = require("./list.controllers");
const { host, port } = require("../config");

// Servicio para crear una nueva lista
const createListService = (req, res) => {
    const { userId, nombreDeLista, type } = req.body;

    listControllers
        .createListController(userId, nombreDeLista, type)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
};

// Servicio para agregar un producto a la lista
const addProductToListService = (req, res) => {
    const { listId, productId } = req.body;

    listControllers
        .addProductToListController(listId, productId)
        .then((data) => {
            if (data.message) {
                res.status(400).json(data);
            } else {
                res.status(201).json(data);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
};

// Servicio para obtener los productos en una lista
const getProductsInListService = (req, res) => {
    const listId = req.params.id;

    listControllers
        .getProductsInListController(listId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
};

// Servicio para eliminar un producto de una lista
const removeProductFromListService = (req, res) => {
    const { listId, productId } = req.body;

    listControllers
        .removeProductFromListController(listId, productId)
        .then((data) => {
            res.status(204).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
};

// Servicio para eliminar una lista
const deleteListService = (req, res) => {
    const listId = req.params.id;

    listControllers
        .deleteListController(listId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
};

module.exports = {
    createListService,
    addProductToListService,
    getProductsInListService,
    removeProductFromListService,
    deleteListService,
};
