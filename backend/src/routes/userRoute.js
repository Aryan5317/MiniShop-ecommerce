import { Router } from "express"
import { registerUser, loginUser, verifyEmail, verifyOtp, resetPassword, refreshAccessToken, updateDetails, logoutUser, fetchLocation, addLocation, deleteLocation, updateSelectedLocation } from "../controllers/userControllers.js"
import { VerifyJWT } from "../middlewares/authMiddleware.js"
const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/verify-email").post(verifyEmail)
userRouter.route("/verify-otp").post(verifyOtp)
userRouter.route("/reset-password").post(resetPassword)
userRouter.route("/refresh-token").post(refreshAccessToken)
userRouter.route("/update-details").patch(VerifyJWT, updateDetails)
userRouter.route("/logOut").post(VerifyJWT, logoutUser)
userRouter.route("/locations").get(VerifyJWT, fetchLocation)
userRouter.route("/add-location").patch(VerifyJWT, addLocation)
userRouter.route("/default-location").patch(VerifyJWT, updateSelectedLocation)

export default userRouter