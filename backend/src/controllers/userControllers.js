import { User } from "../models/userModal.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/errorHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res, next) => {
    const {username, email, password} = req.body
    console.log("Register Data is: ", req.body)    
    console.log(`UserName is: ${username}`)
    console.log(`Email is: ${email}`)
    console.log(`Password is: ${password}`)

    return res.status(200)
    .json(new ApiResponse(200, {}, "User Registered Successfully"))
})

export {registerUser}