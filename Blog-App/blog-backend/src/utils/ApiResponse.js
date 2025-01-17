class ApiResponse {
    constructor(status, message, data = {}){
        this.status = status;
        this.message = message;
        this.success = status < 400;
        this.data = data;
    }
}

export default ApiResponse;