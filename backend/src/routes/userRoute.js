import {Router} from "express"
import {registerUser, loginUser, verifyEmail, verifyOtp, resetPassword, refreshAccessToken} from "../controllers/userControllers.js"
const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/verify-email").post(verifyEmail)
userRouter.route("/verify-otp").post(verifyOtp)
userRouter.route("/reset-password").post(resetPassword)
userRouter.route("/refresh-token").post(refreshAccessToken)

export default userRouter