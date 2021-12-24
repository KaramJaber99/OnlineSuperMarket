let categoriesLogic = require("../logic/categories-logic");
const express = require("express");

const router = express.Router();

// Get all categories
// GET http://localhost:3001/categories
router.get("/", async (request, response, next) => {

    try {
        let categories = await categoriesLogic.getAllCategories();
        response.json(categories);
    }
    catch (error) {
        return next(error); 
    }
});

module.exports = router;