let categoriesDao = require("../dao/categories-dao");

async function getAllCategories() {
    let categories = await categoriesDao.getAllCategories();
    return categories;
}

module.exports = {
    getAllCategories
};