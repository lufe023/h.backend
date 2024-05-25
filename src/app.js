//? Dependencies
const express = require("express");
const cors = require("cors");
const db = require("./utils/database");

//? Files
const { port } = require("./config");
//* Routes
const userRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");
const productsRouter = require("./products/products.router");
const categoriesRouter = require("./categories/categories.router");
const cartRouter = require("./cart/cart.router");
const orderRouter = require("./order/order.router");
const listRouter = require("./list/list.router");
const favoriteListRouter = require("./favoriteList/favoriteList.router");

const initModels = require("./models/initModels");

//? Initial Configs
const app = express();
app.use(cors());
app.use(express.json());

db.authenticate()
    .then(() => {
        console.log("Database Authenticated");
    })
    .catch((err) => {
        console.log(err);
    });

initModels();

db.sync()
    .then(() => {
        console.log("Database Synced");
    })
    .catch((err) => {
        console.log(err);
    });

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
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/list", listRouter);
app.use("/api/v1/favoritelist", favoriteListRouter);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
