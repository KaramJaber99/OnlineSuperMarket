let cache = new Map();

function put(key, value) {
    cache.set(key, value);
}

function get(key) {
    return cache.get(key);
}

function remove(key) {
    cache.delete(key);
}

function extractUserDataFromCache(request) {
    let authorizationString = request.headers["authorization"];
    let token = authorizationString.substring("Bearer ".length);
    let userData = cache.get(token);
    return userData;
}

module.exports = {
    put,
    get,
    remove,
    extractUserDataFromCache
}