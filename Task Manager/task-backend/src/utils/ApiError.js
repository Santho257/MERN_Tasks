class ApiError extends Error {
    constructor(status, errors, message, errorStack) {
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