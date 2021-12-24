let errorHandler = (e, request, response, next) => {

    // jwt authentication error
    if (e.name === 'UnauthorizedError') {
        return response.status(401).json({ error: 'Invalid Token' });
    }

    // e - my server error
    if (e.errorType != undefined) {
        if (e.errorType.isShowStackTrace) {
            console.error(e);
        }
        
        response.status(e.errorType.httpCode).json({error: e.errorType.message});
        return;
    }

    // Reaching here means that we got an UNXPECTED BUG which we didn't wrap with a Server Error
    response.status(700).json({error: "General Error"});
}

module.exports = errorHandler;