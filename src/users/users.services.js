const usersControllers = require("./users.controllers");
const { enviarMail } = require("../utils/mails/sendEmail");

const getAllUsers = (req, res) => {
    usersControllers
        .getAllUsers()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

const getUserById = (req, res) => {
    const id = req.params.id;
    usersControllers
        .getUserById(id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(404).json({ message: err.message });
        });
};

const registerUser = (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        birthday,
        gender,
        country,
    } = req.body;

    if (email && password) {
        //? Ejecutamos el controller
        usersControllers
            .createUser({
                firstName,
                lastName,
                email,
                password,
                phone,
                birthday,
                gender,
                country,
            })
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                const data = err.errors[0];
                delete data.instance;
                res.status(400).json(data);
            });
    } else {
        //? Error cuando no mandan todos los datos necesarios para crear un usuario
        res.status(400).json({
            message: "some fields must be completed",
            mandatory_fields: {
                email: "example@example.com",
                password: "string",
            },
            optional_fields: {
                firstName: "string",
                lastName: "string",
                phone: "+521231231231",
                birthday: "YYYY/MM/DD",
            },
        });
    }
};

const patchUser = (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, phone, gender, country } = req.body;

    usersControllers
        .updateUser(id, { firstName, lastName, phone, gender, country })
        .then((data) => {
            if (data[0]) {
                res.status(200).json({
                    message: `User with ID: ${id}, edited succesfully!`,
                });
            } else {
                res.status(404).json({ message: "Invalid ID" });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    usersControllers
        .deleteUser(id)
        .then((data) => {
            if (data) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: "Invalid ID" });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

//? My user services

const getMyUser = (req, res) => {
    const id = req.user.id; //? req.user contiene la informacion del token desencriptado

    usersControllers
        .getUserById(id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

// TODO crear rutas protegidas /me, con los verbos para update y delete

const patchMyUser = (req, res) => {
    const id = req.user.id;
    const { firstName, lastName, phone, birthday, gender, country } = req.body;

    usersControllers
        .updateUser(id, {
            firstName,
            lastName,
            phone,
            birthday,
            gender,
            country,
        })
        .then(() => {
            res.status(200).json({
                message: `Your user was edited succesfully!`,
            });
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

//? 2 tipos de delete:
//* 1. por administrador
//* 2. por mi mismo

const deleteMyUser = (req, res) => {
    const id = req.user.id;

    usersControllers
        .updateUser(id, { status: "inactive" })
        .then(() => {
            res.status(200).json({
                message: `Your user was deleted succesfully!`,
            });
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

//servicio para solicitar la recuperacion de contraseña via correo electronico
//esto a parte de enviar un correo electronico generará un codigo uuid que se guardará en la DB
//posteriormente se usará para comprobar la legitimidad del cambio
const requestResetPasswordService = (req, res) => {
    const email = req.body.email;
    const frontendHost = req.body.frontendHost;

    if (email.includes("@") && frontendHost) {
        usersControllers
            .requestResetPassword(email)
            .then((data) => {
                if (data[0] != 0) {
                    res.status(201).json({ message: "Peticion enviada" });
                    let bodyEmail = `Se ha hecho una peticion para recuperar la contraseña
                del MI Ecommerce haga Click En el siguiente enlace para recuperar su contraseña
                <a href='${frontendHost}/#/recoverypassword/${data[1]}'>Recuperar Contraseña</a>  `;

                    enviarMail(
                        "no-reply@haciendola.com",
                        email,
                        "Recuperacion de Contraseña",
                        "la recuperacion se envio",
                        bodyEmail
                    );
                } else {
                    res.status(400).json({
                        message: "Esta petición no pudo ser procesada",
                    });
                }
            })
            .catch((err) => {
                res.status(400).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: "some fields must be completed",
            mandatory_fields: {
                email: "example@example.com",
                frontendHost:
                    "tipo: string=> una direccion completa del dominio del frontend y su respectivo path del formulario en donde el usuario pueda cambiar la contraseña ejemplo: https://cursos.haciendola.com/password/new",
            },
        });
    }
};

const changeThePasswordServices = (req, res) => {
    const idRequest = req.params.idRequest;

    const { newPassword, confirmNewPassword } = req.body;

    if (confirmNewPassword && newPassword) {
        if (confirmNewPassword === newPassword) {
            usersControllers
                .changeThePassword(idRequest, { newPassword })
                .then((data) => {
                    if (data[0]) {
                        res.status(200).json({
                            message: `Contraseña cambiada satisfactoriamente`,
                        });
                    } else {
                        res.status(404).json({
                            message:
                                "esta peticion no es valida, asegurese que cuenta con un codigo correcto y que no esté vencido",
                        });
                    }
                })
                .catch((err) => {
                    res.status(400).json({ message: err.message });
                });
        } else {
            res.status(400).json({
                error: "Las contraseñas no coinciden",
                reason: "La contraseña y la confirmación de la contraseña no son iguales",
            });
        }
    } else {
        res.status(400).json({
            message: "Debe enviar todas las celdas",
            fields: {
                confirmNewPassword: "string",
                newPassword: "string",
            },
        });
    }
};
module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    registerUser,
    deleteUser,
    getMyUser,
    patchMyUser,
    deleteMyUser,
    requestResetPasswordService,
    changeThePasswordServices,
};
