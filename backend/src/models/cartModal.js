import mongoose, { Schema } from "mongoose"

const cartValue = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orders: [
        {
            productID: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            productName: {
                type: String,
                required: true,
            },
            productCategory: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            productImages: {
                type: [String],
                default: [],
            },
            discount: {
                type: Number
            },
            color: {
                type: String,
            },
            description: {
                type: String,
                trim: true
            },
            rating: {
                type: Number,
                min: 0,
                max: 5,
            },
            oldPrice: {
                type: Number,
            },
            phoneStorage: {
                type: Number,
                min: 4,
            },
            phoneRam: {
                type: Number,
                min: 2,
            },
        }
    ]
}, { timestamps: true })

export const Cart = mongoose.model("Cart", cartValue)