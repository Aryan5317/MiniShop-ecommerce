import mongoose, {Schema} from "mongoose"

const userSchema = new Schema ({
    username: {
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
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema);