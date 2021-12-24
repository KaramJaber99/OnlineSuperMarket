const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");

async function login(loginDetails) {
    let sql = `SELECT 
                    id,
                    email,
                    first_name AS firstName,
                    last_name AS lastName,
                    user_type AS userType,
                    city,
                    street
                FROM 
                    users 
                WHERE 
                    email =? AND password = ?`;
    let parameters = [loginDetails.email, loginDetails.password];
    let usersLoginResult;

    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
    }

    // A functional (!) issue which means - the userName and password do not match
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED_LOGIN);
    }

    return usersLoginResult[0];
}

async function isUserExistByEmail(email) {
    let sql = "SELECT * FROM users WHERE email =?";
    let parameters = [email];
    let response;

    try {
        response = await connection.executeWithParameters(sql, parameters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, email, error);
    }

    if (response == null || response.length == 0) {
        return false;
    }

    return true;
}

async function isUserExistById(id) {
    let sql = "SELECT * FROM users WHERE id =?";
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

async function addUser(user) {
    let sql = `INSERT INTO users 
                    (id, email, password, user_type, first_name, last_name, city, street)
                VALUES
                    (?,?,?,?,?,?,?,?)`;
    let parameters = [user.id, user.email, user.password, user.userType, user.firstName, 
        user.lastName, user.city, user.street];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
}

module.exports = {
    login,
    isUserExistByEmail,
    isUserExistById,
    addUser
};