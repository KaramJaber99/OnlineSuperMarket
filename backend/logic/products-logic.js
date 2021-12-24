const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let productsDao = require("../dao/products-dao");

async function getProductsByCategory(categoryId) {
    let products = await productsDao.getProductsByCategory(categoryId);
    return products;
}

async function getNumberOfProducts() {
    let numberOfProducts = productsDao.getNumberOfProducts();
    return numberOfProducts;
}

async function addProduct(product, userType) {

    if (userType != "ADMIN"){
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    if (!product.name || !product.categoryId ||
        !product.unitPrice || !product.imageUrl) {
        throw new ServerError(ErrorType.MISSING_REQUIRED_FIELDS);
    }

    let newProductId = await productsDao.addProduct(product);
    return newProductId;
}

async function updateProduct(product, userType) {

    if (userType != "ADMIN"){
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    if (!product.id || !product.name || !product.categoryId ||
        !product.unitPrice || !product.imageUrl) {
        throw new ServerError(ErrorType.MISSING_REQUIRED_FIELDS);
    }

    await productsDao.updateProduct(product);
}

async function getProductsByName(name) {
    let products = await productsDao.getProductsByName(name);
    return products;
}

module.exports = {
    getProductsByCategory,
    getNumberOfProducts,
    addProduct,
    updateProduct,
    getProductsByName
};