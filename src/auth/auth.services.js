const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const { loginUser } = require("./auth.controller");

const login = (req, res) => {
    const { email, password } = req.body;

    //! if(!email || !password) return res.status(400).json({message: 'Missing Data'})

    if (email && password) {
        loginUser(email, password)
            .then((response) => {
                if (response) {
                    // Generar token con expiración en 30 días
                    const expiresIn = "30d";
                    const token = jwt.sign(
                        {
                            id: response.id,
                            email: response.email,
                            role: response.role,
                        },
                        jwtSecret,
                        { expiresIn }
                    );

                    // Calcular fecha de expiración
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 30); // Añadir 30 días a la fecha actual

                    res.status(200).json({
                        message: "Correct Credentials",
                        token,
                        expiresAt: expirationDate, // Enviar fecha de expiración en la respuesta
                    });
                } else {
                    res.status(401).json({ message: "Invalid Credentials" });
                }
            })
            .catch((error) => {
                res.status(400).json({ message: error.message });
            });
    } else {
        res.status(400).json({ message: "Missing Data" });
    }
};

module.exports = {
    login,
};
