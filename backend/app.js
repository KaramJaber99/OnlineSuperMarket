// import modules
const express = require("express");
const cors = require('cors');
const port = process.env.PORT || 3001;

const loginFilter = require("./middleware/login-filter");
const errorHandler = require("./errors/error-handler");

const usersController = require("./controllers/users-controller");
const categoriesController = require("./controllers/categories-controller");
const productsController = require("./controllers/products-controller");
const ordersController = require("./controllers/orders-controller");
const cartsController = require("./controllers/carts-controller");

const server = express();
// server.use(express.static('public'));
server.use(express.json());                                 /* Extracts the JSON from the body and creates request.body object containing it */
server.use(cors({ origin: ['http://localhost:4200']}));     /* Enable other domains to connect to my server */

// init middlewares
server.use(loginFilter());
server.use("/users", usersController);
server.use("/categories", categoriesController);
server.use("/products", productsController);
server.use("/orders", ordersController);
server.use("/carts", cartsController);
server.use(errorHandler);

server.listen(port, () => 
    console.log(`Server is listening on http://localhost:${port}`));