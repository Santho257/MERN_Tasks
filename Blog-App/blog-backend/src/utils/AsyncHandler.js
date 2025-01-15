const asyncHandler = func => (req, res, next) => {
    Promise.resolve(func(req, res, next))
        .catch(error => {
            res.status(500).send(new ApiError(500, "Unknown Error"))
        })
}