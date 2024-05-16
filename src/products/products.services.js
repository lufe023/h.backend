const productsControllers = require("./products.controlers");
const { host, port } = require("../config");
const Product = require("../models/product.models");

//servicio para llamar a todos los productos y devolver una respuesta http con su respectivo codigo
const getAllProductsService = (req, res) => {
    //donde inicia
    const offset = Number(req.query.offset) || 0;

    //vamos a controlar a los frontends un poco por la salud de nuestro servidor de DB limit jamas puede ser mas de 100 ni menos de 0
    const limit =
        Number(req.query.limit) > 100 || Number(req.query.limit) < 0
            ? 100
            : Number(req.query.limit) || 100;
    const urlBase = `http://${host}:${port}/api/v1/products`; //vamos a pasarle la url al frontend para facilitar el paginado

    productsControllers
        .getAllProductsController(offset, limit)
        .then((data) => {
            const nexPage =
                data.count - offset >= limit
                    ? `${urlBase}?offset=${offset + limit}&limit=${limit}`
                    : null;

            const prevPage =
                offset - limit >= 0
                    ? `${urlBase}?offset=${Math.max(
                          0,
                          offset - limit
                      )}&limit=${limit}`
                    : null;
            res.status(200).json({
                next: nexPage,
                prev: prevPage,
                offset,
                limit,
                total: data.count,
                products: data.rows,
            });
        })
        .catch((err) => {
            res.status(400).json({ message: err });
        });
};

//servicio para llamar a un producto por ID y devolver una respuesta http con su respectivo codigo
const getProductByIdService = (req, res) => {
    const id = req.params.id;

    if (id) {
        productsControllers
            .getProductByIdController(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(404).json({ message: err.message });
            });
    } else {
        res.status(404).json({ message: "se nececita enviar un ID" });
    }
};

//servicio para Crear un producto
const createNewProductService = (req, res) => {
    const {
        Title,
        Description,
        SKU,
        Grams,
        Stock,
        Price,
        ComparePrice,
        Barcode,
        category,
    } = req.body;

    const createdBy = req.user.id;

    if (
        Title &&
        Description &&
        SKU &&
        Grams &&
        Stock &&
        Price &&
        ComparePrice &&
        Barcode &&
        category &&
        createdBy
    ) {
        //? Ejecutamos el controller
        productsControllers
            .createNewProductController({
                Title,
                Description,
                SKU,
                Grams,
                Stock,
                Price,
                ComparePrice,
                Barcode,
                category,
                createdBy,
            })
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    } else {
        // Si falta algún campo requerido, envía una respuesta de error
        res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
};

//Servicio actualizacion parcial de un producto
const patchProductService = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    productsControllers
        .updateProductController(id, data)
        .then((data) => {
            if (data[0]) {
                res.status(200).json({
                    message: `Producto actualizado de forma satisfactoria`,
                });
            } else {
                res.status(404).json({ message: "Este Id no es valido" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: err.message });
        });
};

//servicio para borrar un producto de la base de datos
const deleteProductService = (req, res) => {
    const id = req.params.id;

    if (id) {
        productsControllers
            .deleteProductController(id)
            .then((data) => {
                res.status(200).json({
                    message: "Producto eliminado con exito",
                });
            })
            .catch((err) => {
                res.status(404).json({ message: err.message });
            });
    } else {
        res.status(404).json({ message: "se nececita enviar un ID" });
    }
};

module.exports = {
    getAllProductsService,
    getProductByIdService,
    createNewProductService,
    patchProductService,
    deleteProductService,
};
