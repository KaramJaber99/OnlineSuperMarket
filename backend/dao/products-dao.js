const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function getProductsByCategory(categoryId) {
    let sql = `SELECT 
                    id,
                    name,
                    category_id AS categoryId,
                    unit_price AS unitPrice,
                    image_url AS imageUrl
                FROM
                    products
                WHERE
                    category_id = ?`;
    let parameters = [categoryId];
    let products;

    try {
        products = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, categoryId, error);
    }

    return products;
}

async function getNumberOfProducts() {
    let sql = `SELECT COUNT(*) AS count FROM products`;
    let numberOfProducts;

    try {
        numberOfProducts = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
    
    return numberOfProducts[0];
}

async function addProduct(product) {
    let sql = `INSERT INTO 
                    products (name, category_id, unit_price, image_url) 
                VALUES 
                    (?,?,?,?)`;
    let parameters = [product.name, product.categoryId, product.unitPrice, product.imageUrl];
    let response;

    try {
        response = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(product), error);
    }

    return response.insertId;
}

async function updateProduct(product) {
    let sql = `UPDATE products 
                SET 
                    name = ?,
                    category_id = ?,
                    unit_price = ?,
                    image_url = ?
                WHERE
                    id = ?`;
    let parameters = [product.name, product.categoryId, product.unitPrice,
                    product.imageUrl, product.id];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(product), error);
    }
}

async function getProductsByName(name) {
    let sql = `SELECT 
                    id,
                    name,
                    category_id AS categoryId,
                    unit_price AS unitPrice,
                    image_url AS imageUrl
                FROM
                    products
                WHERE
                    LOWER(name) LIKE LOWER(?)`;
    let parameters = ["%" + name + "%"];
    let products;

    try {
        products = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, name, error);
    }

    return products;
}

module.exports = {
    getProductsByCategory,
    getNumberOfProducts,
    addProduct,
    updateProduct,
    getProductsByName
};