const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function getOpenCart(userId) {
    let sql = `SELECT id, date_created AS dateCreated
                FROM carts
                WHERE user_id = ? AND id NOT IN (SELECT cart_id FROM orders)`;
    let parameters = [userId];
    let cart;

    try {
        cart = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(order), error);
    }

    return cart[0];
}

async function createNewCart(userId) {
    let sql = `INSERT INTO carts (user_id, date_created) 
                VALUES (?, CURRENT_DATE())`;
    let parameters = [userId];
    let cartId;

    try {
        cartId = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
    
    return cartId.insertId;
}

async function getCartItems(cart) {
    let sql = `SELECT 
                    product_id AS id,
                    name,
                    image_url AS imageUrl,
                    quantity,
                    price
                FROM
                    cart_items ci
                        JOIN
                    products p ON ci.product_id = p.id
                WHERE
                    cart_id = ?`;
    let parameters = [cart];
    let cartItems;

    try {
        cartItems = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
    
    return cartItems;
}

async function addItemToCart(cartId, product) {
    let sql = `INSERT INTO cart_items (cart_id, product_id, quantity, price) 
                VALUES (?, ?, ?, ?)`;
    let parameters = [cartId, product.id, product.quantity, product.price];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
    }
}

async function deleteItemFromCart(cartId, productId) {
    let sql = `DELETE FROM cart_items
                WHERE cart_id=? AND product_id=?`;
    let parameters = [cartId, productId];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
    }
}

async function emptyCart(cartId) {
    let sql = `DELETE FROM cart_items
                WHERE cart_id=?`;
    let parameters = [cartId];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
    }
}

async function updateCartItem(product, cartId) {
    let sql = `UPDATE cart_items
                SET
                    quantity = ?,
                    price = ?
                WHERE 
                    cart_id = ? AND product_id = ?`;
    let parameters = [product.quantity, product.price, cartId, product.id];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
    }
}

async function isCartExistById(id) {
    let sql = "SELECT * FROM carts WHERE id =?";
    let parameters = [id];
    let response;

    try {
        response = await connection.executeWithParameters(sql, parameters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, id, error);
    }

    if (response == null || response.length == 0) {
        return false;
    }

    return true;
}

module.exports = {
    getOpenCart,
    createNewCart,
    getCartItems,
    addItemToCart,
    deleteItemFromCart,
    emptyCart,
    updateCartItem,
    isCartExistById
};