const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const cartsDao = require("../dao/carts-dao");

async function getOpenCart(userId) {
    let cart = await cartsDao.getOpenCart(userId);
    return cart;
}

async function createNewCart(userId, userType) {
    if (userType != "CUSTOMER") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }
    
    let cartId = await cartsDao.createNewCart(userId);
    return cartId;
}

async function getCartItems(cartId) {
    let cartItems = await cartsDao.getCartItems(cartId);
    return cartItems;
}

async function addItemToCart(userType, cartId, product) {

    if(userType != "CUSTOMER") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    if(!cartId || !product.id || !product.quantity || !product.price) {
        throw new ServerError(ErrorType.MISSING_REQUIRED_FIELDS);
    }

    // Validate cart id exists
    if (!await cartsDao.isCartExistById(cartId)) {
        throw new ServerError(ErrorType.CART_DOSENT_EXIST);
    }

    await cartsDao.addItemToCart(cartId, product);
}

async function deleteItemFromCart(userType, cartId, productId) {

    if(userType != "CUSTOMER") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    await cartsDao.deleteItemFromCart(cartId, productId);
}

async function emptyCart(userType, cartId) {

    if(userType != "CUSTOMER") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    // Validate cart id exists
    if (!await cartsDao.isCartExistById(cartId)) {
        throw new ServerError(ErrorType.CART_DOSENT_EXIST);
    }

    await cartsDao.emptyCart(cartId);
}

async function updateCartItem(userType, product, cartId) {
    
    if(userType != "CUSTOMER") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    await cartsDao.updateCartItem(product, cartId);
}

module.exports = {
    getOpenCart,
    createNewCart,
    getCartItems,
    addItemToCart,
    deleteItemFromCart,
    emptyCart,
    updateCartItem
};