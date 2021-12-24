const usersLogic = require("../logic/users-logic");
let cache = require("./cache-controller");
const express = require("express");
const router = express.Router();

// Login
// POST http://localhost:3001/users/login
router.post("/login", async (request, response, next) => {
    let loginDetails = request.body;

    try {
        let successfulLoginData = await usersLogic.login(loginDetails);
        response.json(successfulLoginData);
    }
    catch (error) {
        return next(error); 
    }
});

// Sign up (add user)
// POST http://localhost:3001/users/
router.post("/", async (request, response, next) => {
    let userDetails = request.body;

    try {
        await usersLogic.addUser(userDetails);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

// Get the user's street
// GET http://localhost:3001/users/street
router.get("/street", async (request, response, next) => {
    try {
        let street =  cache.extractUserDataFromCache(request).street;
        response.json(street);
    }
    catch (error) {
        return next(error);
    }
});

// Get the user's city
// GET http://localhost:3001/users/city
router.get("/city", async (request, response, next) => {
    try {
        let city = cache.extractUserDataFromCache(request).city;
        response.json(city);
    }
    catch (error) {
        return next(error);
    }
});

// logout
// GET http://localhost:3001/users/logout
router.get("/logout", async (request, response, next) => {
    let authorizationString = request.headers["authorization"];
    let token = authorizationString.substring("Bearer ".length);
    
    try {
        cache.remove(token);
        response.json();

    } catch (err) {
        return next(err);
    }
});

module.exports = router;