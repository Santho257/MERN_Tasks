class ApiError extends Error{
    constructor(message, status, errors={}, errorStack){
        super(message);
        this.success = false;
        this.data = message;
        this.status = status;
        this.errors = errors;
        if(errorStack){
            this.errorStack = errorStack
        }
        else{
            this.errorStack = Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;