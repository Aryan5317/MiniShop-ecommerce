import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    otp: {
        type: String,
    },
    otpToken: {
        type: String,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    if (!(this.isModified("password")))
        return;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.genrateAccessToken = function () {
    return jwt.sign({
        // jwt.sign is a function which access genrateAccessToken and create a token
        // it need 3 parameters named
        // jwt.sign(payload, secret, options)
        _id: this.id,
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateOtpToken = function () {
    return jwt.sign({
        _id: this.id,
        email: this.email
    },
        process.env.OTP_VALIDATION_SECRET,
        {
            expiresIn: process.env.OTP_VALIDATION_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);