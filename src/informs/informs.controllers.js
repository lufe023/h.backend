const Users = require("../models/users.models");
const { Op } = require("sequelize");
const moment = require("moment-timezone");

const timezone = "America/Santo_Domingo"; // Ajusta esto a tu zona horaria

// Obtener los usuarios creados hoy
const getUsersTodayController = async () => {
    const startOfDay = moment.tz(timezone).startOf("day").toDate();
    const endOfDay = moment.tz(timezone).endOf("day").toDate();

    const usersToday = await Users.findAll({
        where: {
            createdAt: {
                [Op.between]: [startOfDay, endOfDay],
            },
        },
        attributes: { exclude: ["password"] },
        order: [["createdAt", "DESC"]],
    });
    return usersToday;
};

// Obtener los usuarios creados este mes
const getUsersThisMonthController = async () => {
    const startOfMonth = moment.tz(timezone).startOf("month").toDate();
    const endOfMonth = moment.tz(timezone).endOf("month").toDate();

    const usersThisMonth = await Users.findAll({
        where: {
            createdAt: {
                [Op.between]: [startOfMonth, endOfMonth],
            },
        },
        attributes: { exclude: ["password"] },
        order: [["createdAt", "DESC"]],
    });

    return usersThisMonth;
};

// Obtener los usuarios creados en un día específico
const getUsersByDayController = async (day) => {
    const startOfDay = moment.tz(day, timezone).startOf("day").toDate();
    const endOfDay = moment.tz(day, timezone).endOf("day").toDate();

    const usersByDay = await Users.findAll({
        where: {
            createdAt: {
                [Op.between]: [startOfDay, endOfDay],
            },
        },
        attributes: { exclude: ["password"] },
        order: [["createdAt", "DESC"]],
    });

    return usersByDay;
};

// Obtener los usuarios creados en una semana específica
const getUsersLastWeekController = async () => {
    const startOfLastWeek = moment
        .tz(timezone)
        .subtract(1, "weeks")
        .startOf("week")
        .toDate();
    const endOfLastWeek = moment
        .tz(timezone)
        .subtract(1, "weeks")
        .endOf("week")
        .toDate();

    const usersLastWeek = await Users.findAll({
        where: {
            createdAt: {
                [Op.between]: [startOfLastWeek, endOfLastWeek],
            },
        },
        attributes: { exclude: ["password"] },
        order: [["createdAt", "DESC"]],
    });

    return usersLastWeek;
};

// Obtener los usuarios creados en un mes específico
const getUsersByMonthController = async (monthsAgo) => {
    const startOfMonth = moment
        .tz(timezone)
        .subtract(monthsAgo, "months")
        .startOf("month")
        .toDate();
    const endOfMonth = moment
        .tz(timezone)
        .subtract(monthsAgo, "months")
        .endOf("month")
        .toDate();

    const usersByMonth = await Users.findAll({
        where: {
            createdAt: {
                [Op.between]: [startOfMonth, endOfMonth],
            },
        },
        attributes: { exclude: ["password"] },
        order: [["createdAt", "DESC"]],
    });

    return usersByMonth;
};

// Obtener los usuarios que cumplen años entre dos fechas
const getUsersByBirthdayRangeController = async (startDate, endDate) => {
    const timezone = "America/Santo_Domingo"; // Ajusta esto a tu zona horaria

    const startOfRange = moment.tz(startDate, timezone).startOf("day").toDate();
    const endOfRange = moment.tz(endDate, timezone).endOf("day").toDate();

    const usersByBirthdayRange = await Users.findAll({
        where: {
            birthday: {
                [Op.between]: [startOfRange, endOfRange], // Usuarios que cumplen años dentro del rango de fechas
            },
        },
        attributes: { exclude: ["password"] },
        order: [["birthday", "ASC"]], // Ordenar por fecha de cumpleaños ascendente
    });

    return usersByBirthdayRange;
};

module.exports = {
    getUsersTodayController,
    getUsersThisMonthController,
    getUsersByDayController,
    getUsersLastWeekController,
    getUsersByMonthController,
    getUsersByBirthdayRangeController,
};
