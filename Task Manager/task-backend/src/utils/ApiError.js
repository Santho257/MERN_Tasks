class ApiError extends Error {
    constructor(status, message, errors, errorStack) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message;
        this.success = false;
        if(errorStack){
            this.stack = errorStack;
        }else{
            this.stack = Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;