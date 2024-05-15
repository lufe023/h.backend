//? Dependencies
const express = require("express");
const db = require("./utils/database");

//? Files
const { port } = require("./config");
//* Routes
const userRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");
const productsRouter = require("./products/products.router");
const initModels = require("./models/initModels");

//? Initial Configs
const app = express();

app.use(express.json());

db.authenticate()
    .then(() => {
        console.log("Database Authenticated");
    })
    .catch((err) => {
        console.log(err);
    });

db.sync()
    .then(() => {
        console.log("Database Synced");
    })
    .catch((err) => {
        console.log(err);
    });

initModels();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "OK!",
        products: `localhost:${port}/api/v1/products`,
    });
});

//listado y asignacion de las rutas
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
