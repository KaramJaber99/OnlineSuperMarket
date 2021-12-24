let cartsLogic = require("../logic/carts-logic");
let cache = require("./cache-controller");
const express = require("express");

const router = express.Router();

// Get open cart
// GET http://localhost:3001/carts/
router.get("/", async (request, response, next) => {
    let userId = cache.extractUserDataFromCache(request).id;

    try {
        let cart = await cartsLogic.getOpenCart(userId);
        response.json(cart);
    }
    catch (error) {
        return next(error); 
    }
});

// Create new cart
// POST http://localhost:3001/carts/
router.post("/", async (request, response, next) => {
    let userId = cache.extractUserDataFromCache(request).id;
    let userType = cache.extractUserDataFromCache(request).userType;

    try {
        let cartId = await cartsLogic.createNewCart(userId, userType);
        response.json(cartId);
    }
    catch (error) {
        return next(error); 
    }
});

// Get cart's items
// GET http://localhost:3001/carts/:id
router.get("/:id", async (request, response, next) => {
    let cartId = request.params.id;

    try {
        let cartItems = await cartsLogic.getCartItems(cartId);
        response.json(cartItems);
    }
    catch (error) {
        return next(error); 
    }
});

// Add item to cart
// POST http://localhost:3001/carts/product
router.post("/product", async (request, response, next) => {
    let userType = cache.extractUserDataFromCache(request).userType;
    let cartId = request.body.cartId;
    let product = request.body.product;

    try {
        await cartsLogic.addItemToCart(userType, cartId, product);
        response.json();
    }
    catch (error) {
        return next(error); 
    }
});

// Delete item from cart
// DELETE http://localhost:3001/carts/product/:cartId/:productId
router.delete("/product/:cartId/:productId", async (request, response, next) => {
    let userType = cache.extractUserDataFromCache(request).userType;
    let cartId = request.params.cartId;
    let productId = request.params.productId;

    try {
        await cartsLogic.deleteItemFromCart(userType, cartId, productId);
        response.json();
    }
    catch (error) {
        return next(error); 
    }
});

// Empty cart
// DELETE http://localhost:3001/carts/:id
router.delete("/:id", async (request, response, next) => {
    let userType = cache.extractUserDataFromCache(request).userType;
    let cartId = request.params.id;
    
    try {
        await cartsLogic.emptyCart(userType, cartId);
        response.json();
    }
    catch (error) {
        return next(error); 
    }
});

// Update cart item
// PUT http://localhost:3001/carts/
router.put("/", async (request, response, next) => {
    let userType = cache.extractUserDataFromCache(request).userType;
    let product = request.body.product;
    let cartId = request.body.cartId;
    
    try {
        await cartsLogic.updateCartItem(userType, product, cartId);
        response.json();
    }
    catch (error) {
        return next(error); 
    }
});

module.exports = router;