//? Dependencies
const uuid = require("uuid");

const Users = require("../models/users.models");
const { hashPassword } = require("../utils/crypto");
const Roles = require("../models/roles.models");

//conseguir todos los usuarios que existan en el sistema
const getAllUsers = async (offset, limit) => {
    const data = await Users.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: {
            exclude: ["password"],
        },
    });
    return data;
};

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id: id,
            status: "active",
        },
        attributes: { exclude: ["password"] },
        include: [
            {
                model: Roles,
            },
        ],
    });
    return data;
};

const createUser = async (data) => {
    const newUser = await Users.create({
        id: uuid.v4(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email.toLowerCase(),
        password: hashPassword(data.password),
        phone: data.phone,
        role: data.role || 1,
    });

    // Excluir el campo 'password' antes de devolver el usuario
    const user = newUser.toJSON();
    delete user.password;

    return user;
};

const updateUser = async (id, data) => {
    const result = await Users.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id,
        },
    });
    return data;
};

const getUserByEmail = async (email) => {
    //? SELECT * FROM users where email = 'sahid.kick@academlo.com'//
    const data = await Users.findOne({
        where: {
            email: email,
            status: "active",
        },
    });
    return data;
};

const requestResetPassword = async (email) => {
    const codigo = uuid.v4();
    const result = await Users.update(
        {
            passwordRequest: codigo,
        },
        {
            where: {
                email,
            },
        }
    );
    return [result, codigo];
};

const changeThePassword = async (idRequest, data) => {
    const result = await Users.update(
        {
            password: hashPassword(data.newPassword),
            passwordRequest: null,
        },
        {
            where: {
                passwordRequest: idRequest,
            },
        }
    );
    return result;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    requestResetPassword,
    changeThePassword,
};
