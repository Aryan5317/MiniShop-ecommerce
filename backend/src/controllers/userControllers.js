import { User } from "../models/userModal.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/errorHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { sendEmail } from "../utils/sendEmail.js"
import jwt from "jsonwebtoken"

const genrateRefreshAndAccessToken = async (userId) => {
    try {
        const token = await User.findById(userId);
        const accessToken = await token.genrateAccessToken();
        const refreshToken = await token.genrateRefreshToken();
        token.refreshToken = refreshToken;
        await token.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    }
    catch (err) {
        console.log("Error is: ", err);
        throw new ApiError(500, "Something went wrong while creating access and refresh token")
    }

}

const registerUser = asyncHandler(async (req, res, next) => {
    const fullnameRegix = /^[A-Za-z\s]+$/
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    const { username, email, password } = req.body
    console.log("Register Data is: ", req.body)
    console.log(`UserName is: ${username}`)
    console.log(`Email is: ${email}`)
    console.log(`Password is: ${password}`)
    let fullname;

    if (!username) {
        throw new ApiError(400, "*Username is required")
    }
    else if (!fullnameRegix.test(fullname)) {
        throw new ApiError(400, "*Only Charachter and spaces are allowed")
    }
    else {
        fullname = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
    }
    if (!email) {
        throw new ApiError(400, "*Email is required")
    }
    if (!password) {
        throw new ApiError(400, "*Password is required")
    }
    else if (!(password.length > 7 && password.length < 16)) {
        throw new ApiError(400, "*Password length must be in between 8 and 15")
    }
    else if (!passwordRegix.test(password)) {
        throw new ApiError(400, "*Atleast 1uppercase, 1lowercase and 1 number is required");
    }
    console.log("Fullname is: ", fullname)

    try {
        let checkEmail = email;
        const verifyUserEmail = await sendEmail({
            to: checkEmail,
            subject: "Welcome to MiniShop 🎉 Your Account is Ready",
            text: `Hi

Welcome to MiniShop! 🎉

Your account has been successfully created. You can now browse products, add items to your cart, and start shopping with us.

If you did not create this account, please contact our support team immediately.
📧 Email: aryandesu69@gmail.com
📞 Phone: +91 98765 43210
Happy Shopping! 🛍️
Team MiniShop`
        })
        console.log("Email send succesfully", verifyUserEmail)
    }
    catch (err) {
        console.log("Error while verifying email: ", err)
        throw new ApiError(404, "*Email id does not exist")
    }

    const existUser = await User.findOne({
        $or: [{ fullname: fullname }, { email: email.toLowerCase() }]
    })
    if (existUser) {
        throw new ApiError(400, "*User Already Exist")
    }
    const newUser = await User.create({
        fullname,
        email: email.toLowerCase(),
        password: password

    })
    console.log("User created:", newUser)

    const userCreated = await User.findById(newUser._id)
        .select("-password")
    if (!userCreated) {
        throw new ApiError(404, "Error while creating the new user")
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "User Registered Successfully"))
})

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    console.log("Email is: ", email)
    console.log("Password is: ", password)

    const findUser = await User.findOne({
        email: email
    })
    if (!findUser) {
        throw new ApiError(400, "*User does not esist register first")
    }
    console.log("Login user is: ", findUser)
    const userId = await findUser._id
    console.log("Login user id is: ", userId)
    const isPassword = await findUser.isPasswordCorrect(password)
    console.log("Is Password value is: ", isPassword)
    if (!isPassword) {
        throw new ApiError(404, "*Enter correct password")
    }
    const { accessToken, refreshToken } = await genrateRefreshAndAccessToken(userId)
    console.log("Access Token is: ", accessToken)
    console.log("Refresh Token is: ", refreshToken)
    const loggedInUser = await User.findById(userId)
        .select("-password -refreshToken")
    const options = {
        httpOnly: true, // it makes only accessible by server not by client(browser)
        secure: false, // for localhost always false and after deploy use true here
        sameSite: "Lax",
        path: "/"
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, {
                userLoginDetails: loggedInUser,
                accessToken,
                refreshToken
            }, "User Loggin Successfully"))

})

const verifyEmail = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    console.log("Email for verification is: ", email)

    const findUser = await User.findOne({ email: email })
    console.log("User is: ", findUser)
    if (!findUser) {
        throw new ApiError(404, "*User Not Found")
    }
    const userId = await findUser._id

    const otpToken = await findUser.genrateOtpToken();
    if (!otpToken) {
        throw new ApiError(500, "Error while creating Token")
    }
    console.log("Otp token: ", otpToken)


    const otp = Math.floor(100000 + Math.random() * 900000)
    console.log("Otp is: ", otp)
    findUser.otp = otp
    findUser.otpToken = otpToken

    await findUser.save()

    const send_Email = findUser.email
    console.log("User email fetched is: ", send_Email)

    try {
        const sendingOtpEmail = await sendEmail({
            to: send_Email,
            subject: "Your MiniShop Password Reset Otp",
            text: `Hello,

We received a request to reset your password for your MiniShop account.

Your One-Time Password (OTP) is: ${otp}

This OTP is valid for 10 minutes.

If you did not request a password reset, please ignore this email. Your account remains secure.

Regards,  
MiniShop Team`
        })
        console.log("OTP send details: ", sendingOtpEmail)

    }
    catch (err) {
        console.log("Error while sending email is: ", err)
        throw new ApiError(500, "Error while sending otp")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const verifiedEmailUser = await User.findById(userId)
        .select("-password -otp -accessToken -refreshToken -fullname")


    return res.status(200)
        .cookie("otpToken", otpToken, options)
        .json(new ApiResponse(200, {
            forgetPasswordDetails: verifiedEmailUser,
            otpToken: otpToken
        }, "Otp Sended to email"))

})

const verifyOtp = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body
    const otpTokenCookies = req.cookies.otpToken
    console.log("otp Token from cookie is: ", otpTokenCookies)
    console.log("Email for otp is: ", email)
    console.log("Otp is: ", otp)

    const findUser = await User.findOne({
        email: email
    })

    if (!findUser) {
        throw new ApiError(404, "*User not exist signin first")
    }
    console.log("User find updated is: ", findUser)
    const savedOtpToken = await findUser.otpToken
    if (!(savedOtpToken === otpTokenCookies)) {
        throw new ApiError(500, "Invalid User")
    }
    if (!(otp === findUser.otp)) {
        throw new ApiError(404, "*Otp does not matched.Invalid Otp")
    }
    return res.status(200)
        .json(new ApiResponse(200, {}, "Otp verified Successfully"))
})

const resetPassword = asyncHandler(async (req, res, next) => {
    const { newPassword, confirmPassword } = req.body;
    const otpTokenCookies = req.cookies.otpToken
    console.log("Otp token in reset password is: ", otpTokenCookies)
    console.log("New Password is: ", newPassword)
    console.log("Confirm Password is: ", confirmPassword)

    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

    if (!newPassword) {
        throw new ApiError(404, "*Password is required")
    }
    else if (!(newPassword.length > 7 && newPassword.length < 16)) {
        throw new ApiError(404, "*Password length must be in between 8 and 15")
    }
    else if (!(passwordRegix.test(newPassword))) {
        throw new ApiError(404, "*Atleast 1uppercase, 1lowercase and 1 number is required")
    }
    if (!confirmPassword) {
        throw new ApiError(404, "*Confirm Password is required")
    }
    else if (!(confirmPassword.length > 7 && confirmPassword.length < 16)) {
        throw new ApiError(404, "*Password length must be in between 8 and 15")
    }
    else if (!(passwordRegix.test(confirmPassword))) {
        throw new ApiError(404, "*Atleast 1uppercase, 1lowercase and 1 number is required")
    }
    if (!(newPassword === confirmPassword)) {
        throw new ApiError(404, "*New Password and Confirm Password does not match")
    }

    const findUser = await User.findOne({ otpToken: otpTokenCookies })
    console.log("Find User is: ", findUser)

    const userId = await findUser._id;

    findUser.password = newPassword;
    await findUser.save()

    const getUserDetails = await User.findById(userId)
        .select("-password -otp -otpToken -refreshToken -accessToken")
    console.log("User details after updating password is: ", getUserDetails)


    return res.status(200)
        .json(new ApiResponse(200, {
            userDetails: getUserDetails
        }, "Password Updated"))
})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body
    console.log("New refresh Token is: ", incomingRefreshToken)
    if (!incomingRefreshToken) {
        throw new ApiError(404, "Unauthorized User")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        console.log("Decoded Token is: ", decodedToken)
        const userId = await decodedToken?._id
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(400, "Invalid Refresh Token")
        }

        if (!(incomingRefreshToken === user?.refreshToken)) {
            throw new ApiError(404, "Refresh Token is expired or used")
        }
        const { accessToken, newRefreshToken } = await genrateRefreshAndAccessToken(userId)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        newRefreshToken
                    },
                    "Access Token Refreshed"
                )
            )
    }
    catch (err) {
        throw new ApiError(404, err?.message || "Invalid Refresh Token")
    }

})

export { registerUser, loginUser, verifyEmail, verifyOtp, resetPassword, refreshAccessToken }