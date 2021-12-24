let productsLogic = require("../logic/products-logic");
const cache = require("../controllers/cache-controller");
const express = require("express");

const router = express.Router();

// Get number of products
// GET http://localhost:3001/products/count
router.get("/count", async (request, response, next) => {
    try {
        let numberOfProducts = await productsLogic.getNumberOfProducts();
        response.json(numberOfProducts);
    }
    catch (error) {
        return next(error); 
    }
});

// Get products by category
// GET http://localhost:3001/products/:id
router.get("/:id", async (request, response, next) => {
    let categoryId = request.params.id;

    try {
        let products = await productsLogic.getProductsByCategory(categoryId);
        response.json(products);
    }
    catch (error) {
        return next(error); 
    }
});

// Get products by name
// GET http://localhost:3001/products/search/:name
router.get("/search/:name", async (request, response, next) => {
    let name = request.params.name;
    
    try {
        let products = await productsLogic.getProductsByName(name);
        response.json(products);
    }
    catch (error) {
        return next(error); 
    }
});

// Add new product
// POST http://localhost:3001/products/
router.post("/", async (request, response, next) => {

    let product = request.body;
    let userType = cache.extractUserDataFromCache(request).userType;

    try {
        let newProductId = await productsLogic.addProduct(product, userType);
        response.json(newProductId);
    }
    catch (error) {
        return next(error); 
    }
});

// Update product
// PUT http://localhost:3001/products/
router.put("/", async (request, response, next) => {

    let product = request.body;
    let userType = cache.extractUserDataFromCache(request).userType;

    try {
        await productsLogic.updateProduct(product, userType);
        response.json();
    }
    catch (error) {
        return next(error); 
    }
});

module.exports = router;