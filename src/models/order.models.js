const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Users = require("./users.models");

const Order = db.define("Order", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: "id",
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pendiente", // Puedes tener distintos estados como "pendiente", "enviado", "entregado", etc.
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    //este metodo de pago en un sistema en produccion podriamos ampliarlo y conectarlo a otro modelo en donde esten registrados los metodos de pago del cliente con todos sus detalles, de momento lo dejaré hasta aquí para no alargar el tiempo de entrega de la tarea
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Order;
