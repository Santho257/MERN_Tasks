class ApiError extends Error{
    constructor(status, message, errors = {}, stackTrace) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.success = false;
        this.stackTrace = stackTrace ?? Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;