const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let ordersDao = require("../dao/orders-dao");

async function getTotalNumberOfOrders() {
    let numberOfOrders = await ordersDao.getTotalNumberOfOrders();
    return numberOfOrders;
}

async function createNewOrder(order, userType) {
    if(userType != "CUSTOMER") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    if(!order.cartId || !order.totalPrice || !order.city || !order.street ||
        !order.deliveryDate || !order.paymentMethod) {
            throw new ServerError(ErrorType.MISSING_REQUIRED_FIELDS);
    }

    // Check that the chosen delivery isn't full
    if(await ordersDao.isUnavailableDeliveryDate(order.deliveryDate)) {
        throw new ServerError(ErrorType.UNAVAILABLE_DELIVERY_DATE);
    }
    
    let orderId = await ordersDao.createNewOrder(order);
    return orderId;
}

async function getLatestOrder(userId) {
    let latestOrder = await ordersDao.getLatestOrder(userId);
    return latestOrder;
}

async function getUnavailableDeliveryDates() {
    let dates = await ordersDao.getUnavailableDeliveryDates();
    return dates;
}

module.exports = {
    getTotalNumberOfOrders,
    createNewOrder,
    getLatestOrder,
    getUnavailableDeliveryDates
};