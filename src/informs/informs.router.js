const router = require("express").Router();
const passport = require("passport");
const {
    leaderValidate,
    adminValidate,
    itSupportValidate,
    superAdminValidate,
    isAdministrator,
} = require("../middlewares/role.middleware");
const informServices = require("./informs.services");

require("../middlewares/auth.middleware")(passport);

// Obtener los usuarios de hoy
router.get(
    "/userstoday",
    passport.authenticate("jwt", { session: false }),
    informServices.getUsersTodayServices
);

// Obtener los usuarios del mes actual
router.get(
    "/usersthismonth",
    passport.authenticate("jwt", { session: false }),
    informServices.getUsersThisMonthServices
);

// Obtener los usuarios de un día específico
router.get(
    "/usersbyday/:day",
    passport.authenticate("jwt", { session: false }),
    informServices.getUsersByDayServices
);

// Obtener los usuarios de la semana pasada
router.get(
    "/userslastweek",
    passport.authenticate("jwt", { session: false }),
    informServices.getUsersLastWeekServices
);

// Obtener los usuarios de hace un número específico de meses
router.get(
    "/usersbymonth/:monthsAgo",
    passport.authenticate("jwt", { session: false }),
    informServices.getUsersByMonthServices
);

// Obtener los usuarios que cumplen años entre dos fechas
router.get(
    "/usersbybirthdayrange",
    passport.authenticate("jwt", { session: false }),
    informServices.getUsersByBirthdayRangeServices
);
module.exports = router;
