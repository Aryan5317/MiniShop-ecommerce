import mongoose, { Schema } from "mongoose"
const userOrder = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orders: [
        {
            productID: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            name: {
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
            returning: {
                type: Number,
                default: 0,
                min: 0,
                max: 1,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            totalCost: {
                type: Number,
                required: true,
                default: 0,
            },
            date: {
                type: String,
                required: true,
            }
        }
    ]
}, { timestamps: true })

export const Orders = mongoose.model("Orders", userOrder)