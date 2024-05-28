const informControllers = require("./informs.controllers");

// Obtener los usuarios de hoy
const getUsersTodayServices = (req, res) => {
    informControllers
        .getUsersTodayController()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

// Obtener los usuarios del mes
const getUsersThisMonthServices = (req, res) => {
    informControllers
        .getUsersThisMonthController()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

// Obtener los usuarios de un día específico
const getUsersByDayServices = (req, res) => {
    const { day } = req.params;
    informControllers
        .getUsersByDayController(day)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

// Obtener los usuarios de la semana pasada
const getUsersLastWeekServices = (req, res) => {
    informControllers
        .getUsersLastWeekController()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

// Obtener los usuarios de hace un número específico de meses
const getUsersByMonthServices = (req, res) => {
    const { monthsAgo } = req.params;
    informControllers
        .getUsersByMonthController(monthsAgo)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

// Obtener los usuarios que cumplen años entre dos fechas
const getUsersByBirthdayRangeServices = (req, res) => {
    const { startDate, endDate } = req.query;
    informControllers
        .getUsersByBirthdayRangeController(startDate, endDate)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

module.exports = {
    getUsersTodayServices,
    getUsersThisMonthServices,
    getUsersByDayServices,
    getUsersLastWeekServices,
    getUsersByMonthServices,
    getUsersByBirthdayRangeServices,
};
