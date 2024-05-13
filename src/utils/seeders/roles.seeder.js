const { Role } = require("../models"); // Asegúrate de importar el modelo Role correctamente

const roles = [
    {
        id: 1,
        roleName: "Cliente",
        level: 1,
    },
    {
        id: 2,
        roleName: "Administrador",
        level: 2,
    },
    // Puedes agregar más roles según sea necesario
];

const seedRoles = async () => {
    try {
        await Role.bulkCreate(roles);
        console.log("Roles creados exitosamente.");
    } catch (error) {
        console.error("Error al crear roles:", error);
    }
};

module.exports = seedRoles;
