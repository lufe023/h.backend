const categoriesControllers = require("./categories.controllers");
const { host, port } = require("../config");

//servicio para encontrar una categoría por ID
const getCategoryByIdService = (req, res) => {
    const id = req.params.id;

    if (id) {
        categoriesControllers
            .getCategoryByIdController(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(404).json({ err });
            });
    } else {
        res.status(404).json({ message: "se nececita enviar un ID" });
    }
};

//servicio para llamar a todos los productos y devolver una respuesta http con su respectivo codigo
const getAllCategoriesService = (req, res) => {
    //donde inicia
    const offset = Number(req.query.offset) || 0;

    //vamos a controlar a los frontends un poco por la salud de nuestro servidor de DB limit jamas puede ser mas de 100 ni menos de 0
    const limit =
        Number(req.query.limit) > 100 || Number(req.query.limit) < 0
            ? 100
            : Number(req.query.limit) || 100;
    const urlBase = `http://${host}:${port}/api/v1/products/categories`; //vamos a pasarle la url al frontend para facilitar el paginado

    categoriesControllers
        .getAllCategoriesController(offset, limit)
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
                categories: data.rows,
            });
        })
        .catch((err) => {
            res.status(400).json({ message: err });
        });
};

//servicio para Crear una categoría
const createNewCategoryService = (req, res) => {
    const { name, parent, description } = req.body;

    if (name) {
        categoriesControllers
            .createNewCategoryController({ name, parent, description })
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    } else {
        // Si falta algún campo requerido, envía una respuesta de error
        res.status(400).json({
            message: "Debe proporcionar como mínimo el name",
        });
    }
};

//Servicio actualizacion parcial de una categoria
const patchCategoryService = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    categoriesControllers
        .updateCategoryController(id, data)
        .then((data) => {
            if (data[0]) {
                res.status(200).json({
                    message: `Categoría actualizado de forma satisfactoria`,
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
const deleteCategoryService = (req, res) => {
    const id = req.params.id;

    if (id) {
        categoriesControllers
            .deleteCategoryController(id)
            .then((data) => {
                res.status(204).json({
                    message: "Categoría eliminado con exito",
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
    getCategoryByIdService,
    getAllCategoriesService,
    createNewCategoryService,
    patchCategoryService,
    deleteCategoryService,
};
