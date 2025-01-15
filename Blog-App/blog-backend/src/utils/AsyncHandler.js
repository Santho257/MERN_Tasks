import ApiError from "./ApiError.js"

export const asyncHandler = func => (req, res, next) => {
    Promise.resolve(func(req, res, next))
        .catch(error => {
            if(error instanceof ApiError){
                res.status(error.status).send(error);
            }
            res.status(500).send(new ApiError(500, "Unknown Error"))
        })
}