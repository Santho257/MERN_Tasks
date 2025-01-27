class ApiResponse{
    constructor(status, data, message){
        this.status = status;
        this.data = data;
        this.message = message;
        this.success = this.status >= 200 && this.status < 400;
    }
}