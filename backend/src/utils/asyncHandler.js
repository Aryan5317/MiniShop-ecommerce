const asyncHandler = (requestHandler) => {
    return(req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err => next(err)))
    }
}




export { asyncHandler }


// This is in try catch method above is in promise method
// Higher Order arrow function
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     }
//     catch (err) {
//         res.status(err.code || 500).json({
//             success: false,
//             menubar: err.message
//         })
//     }
// }