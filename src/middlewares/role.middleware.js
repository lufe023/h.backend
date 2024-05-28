const { getUserById } = require("../users/users.controllers");

const adminValidate = (req, res, next) => {
    const role = req.user.role;
    const user = req.user.usuario;

    //aqui se configura el nivel de los roles de los usuario para permitir entrar o no a distintos lugares
    //role = 1 es colaborador
    // role = 2 es admin
    //role = 3 es super admin
    if (role >= 2) {
        next();
    } else {
        res.status(401).json({
            message: "Access Denied!",
            reason: "you do not have the required access level: Admin",
            requiredLevel: 2,
            your: role,
        });
    }
};

const isDelegate = async (req, res, next) => {
    const user = req.user.id;

    //List of users who have permission to this area
    const permissionList = [
        { id: 2, roleName: "Administrador" },
        { id: 3, roleName: "Delegado" },
        { id: 5, roleName: "super admin" },
    ];

    try {
        const consulta = await getUserById(user);
        const userRoleId = consulta.user_role.id;

        const tienePermiso = permissionList.some(
            (item) => item.id === userRoleId
        );

        if (tienePermiso) {
            next();
        } else {
            res.status(401).json({
                message:
                    "Acceso denegado, necesitas ser Delegado para realizar esta acción!",
                reason: "No tienes los permisos necesarios",
                youRoleIs: consulta.user_role,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Access Denied!",
            reason: "Error occurred while checking permissions",
        });
    }
};

const isAdministratorBoolean = async (userId) => {
    const user = userId;

    //List of users who have permission to this area
    const permissionList = [
        { level: 2, roleName: "Administrador" },
        { level: 3, roleName: "Delegado" },
        { level: 5, roleName: "super admin" },
    ];

    try {
        const consulta = await getUserById(user);
        const userRoleId = consulta.user_role.level;

        const tienePermiso = permissionList.some(
            (item) => item.level === userRoleId
        );

        if (tienePermiso) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Access Denied!",
            reason: "Error occurred while checking permissions",
        });
    }
};

const isAdministrator = async (req, res, next) => {
    const user = req.user.id;

    //List of users who have permission to this area
    const permissionList = [
        { id: 2, roleName: "Administrador" },
        { id: 3, roleName: "Delegado" },
        { id: 5, roleName: "super admin" },
    ];

    try {
        const consulta = await getUserById(user);
        const userRoleId = consulta.role;

        const tienePermiso = permissionList.some(
            (item) => item.id === userRoleId
        );

        if (tienePermiso) {
            next();
        } else {
            res.status(401).json({
                message: "Access Denied!",
                reason: "You do not have the required access level",
                youRoleIs: consulta.user_role,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Access Denied!",
            reason: "Error occurred while checking permissions",
        });
    }
};

const leaderValidate = (req, res, next) => {
    const role = req.user.role;

    //aqui se configura el nivel de los roles de los usuario para permitir entrar o no a distintos lugares
    //role = 1 es colaborador
    // role = 2 es admin
    //role = 3 es super admin
    if (role >= 3) {
        next();
    } else {
        res.status(401).json({
            message: "Access Denied!",
            reason: "you do not have the required access level: Leader",
            requiredLevel: 3,
            your: role,
        });
    }
};

const itSupportValidate = (req, res, next) => {
    const role = req.user.role;

    //aqui se configura el nivel de los roles de los usuario para permitir entrar o no a distintos lugares
    if (role >= 4) {
        next();
    } else {
        res.status(401).json({
            message: "Access Denied!",
            reason: "you do not have the required access level: IT Support",
            requiredLevel: 4,
        });
    }
};

const superAdminValidate = (req, res, next) => {
    const role = req.user.role;

    //aqui se configura el nivel de los roles de los usuario para permitir entrar o no a distintos lugares
    if (role === 5) {
        next();
    } else {
        res.status(401).json({
            message: "Access Denied!",
            reason: "You need to be GodLevel",
            requiredLevel: 9999999999,
        });
    }
};

module.exports = {
    leaderValidate,
    adminValidate,
    itSupportValidate,
    superAdminValidate,
    isAdministrator,
    isDelegate,
    isAdministratorBoolean,
};
