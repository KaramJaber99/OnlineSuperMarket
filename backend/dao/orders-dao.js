const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function getTotalNumberOfOrders() {
    let sql = `SELECT COUNT(*) AS count FROM orders`;
    let numberOfOrders;

    try {
        numberOfOrders = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }

    return numberOfOrders[0];
}

async function createNewOrder(order) {
    let sql = `INSERT INTO orders 
                    (cart_id, 
                    total_price, 
                    city, 
                    street, 
                    order_date, 
                    delivery_date, 
                    payment_method) 
                VALUES (?, ?, ?, ?, CURRENT_DATE(), DATE(?), ?)`;
    let parameters = [order.cartId, order.totalPrice, order.city,
        order.street, order.deliveryDate.split('T')[0], order.paymentMethod];
    let orderId;

    try {
        orderId = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(order), error);
    }

    return orderId.insertId;
}

async function getLatestOrder(userId) {
    let sql = `SELECT 
                    o.id,
                    cart_id AS cartId,
                    total_price AS totalPrice,
                    city,
                    street,
                    order_date AS orderDate,
                    delivery_date AS deliveryDate,
                    payment_method AS paymentMethod
                FROM
                    orders o
                        JOIN
                    carts c ON o.cart_id = c.id
                WHERE
                    user_id = ?
                ORDER BY order_date DESC
                LIMIT 1`;
    let parameters = [userId];
    let order;

    try {
        order = await connection.executeWithParameters(sql, parameters);
    }
    catch(error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }

    return order[0];
}

async function getUnavailableDeliveryDates() {
    let sql = `SELECT 
                    delivery_date AS 'deliveryDate'
                FROM
                    orders
                WHERE 
                    delivery_date >= NOW() 
                GROUP BY 
                    delivery_date
                HAVING 
                    COUNT(*) = 3`;
    let dates;

    try {
        dates = await connection.execute(sql);
    }
    catch(error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }

    return dates;
}

async function isUnavailableDeliveryDate(date) {
    let sql = `SELECT 
                    COUNT(*) AS count
                FROM 
                    orders 
                WHERE 
                    delivery_date =?
                GROUP BY  
                    delivery_date`;
    let parameters = [date.split('T')[0]];
    let response;

    try {
        response = await connection.executeWithParameters(sql, parameters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, id, error);
    }

    if (response.length > 0 && response[0].count >= 3) {
        return true;
    }

    return false;
}

module.exports = {
    getTotalNumberOfOrders,
    createNewOrder,
    getLatestOrder,
    getUnavailableDeliveryDates,
    isUnavailableDeliveryDate
};