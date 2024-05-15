const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Category = db.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //columna o campo parent
    //se utilizará para determinar si una categoria tiene una superior, lo que es lo mismo que decir si una categoria es sub-categoria
    // ejemplo: en el modelo puede existir una categoria Automovil con el id[1], a su vez pueden existir las subcategorias accesorios id[401]
    // y la subcategoria repuestos id[402] en ambos casos de estas subcategorias el valor parent seria 1 que representa al id de la categoria superior automovil
    parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = Category;
