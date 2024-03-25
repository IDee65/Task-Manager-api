

class ApiError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode;
    }
} 

const apiError = (msg, statusCode) => {
    return new ApiError(msg, statusCode);
}

module.exports = {apiError, ApiError};