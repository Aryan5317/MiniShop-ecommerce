import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/errorHandler.js"
import { User } from "../models/userModal.js"
import jwt from "jsonwebtoken"

export const VerifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
    console.log("Access token from cookies: ", token)
    try {
        if (!token) {
            throw new ApiError(404, "UnAuthorized Error")
        }
        const decodeToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        )
        const checkingLoggedUser = await User.findById(decodeToken._id)
            .select("-password -refreshToken -otpToken -otp")
        if (!checkingLoggedUser) {
            throw new ApiError(401, "Invalid user token")
        }

        req.verifyUser = checkingLoggedUser
        next()
    }
    catch (err) {
        throw new ApiError(401, err?.message || "Invalid Access Token")
    }
}) 