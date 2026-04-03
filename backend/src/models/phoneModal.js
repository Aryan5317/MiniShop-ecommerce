import mongoose, { Mongoose, Schema } from "mongoose";
const mobileSchema = new Schema({
    phoneName: {
        type: String,
        required: [true, "Phone Name is required"]
    },
    phoneBrand: {
        type: String,
        required: [true, "Phone Brand is required"]
    },
    phoneStorage: {
        type: Number,
        required: true,
        min: 4,
    },
    phoneRam: {
        type: Number,
        required: true,
        min: 2,
    },
    phoneImages: {
        type: [String],
        default: [],
    },
    phoneCondition: {
        type: String,
        required: true,
        default: "new",
        enum: ["old", "new"],
    },
    category: {
        type: String,
    },
    productCategory: {
        type: String,
        required: true,
    },
    description: {
        highlights: {
            type: String,
            trim: true
        },
        display: {
            type: String,
            trim: true
        },
        camera: {
            type: String,
            trim: true
        },
        battery: {
            type: String,
            trim: true
        },
        extras: {
            type: String,
            trim: true
        }
    },
    currentPrice: {
        type: Number,
        required: [true, "Current Price is required"]
    },
    oldPrice: {
        type: Number,
    },
    discount: {
        type: Number
    },
    returning: {
        type: Number,
        default: 1,
        min: 0,
        max: 1,
        required: true,
    },
    color: {
        type: String,
    },
    totalSell: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [{
        author: {
            type: String,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        message: {
            type: String,
            trim: true,
        }
    }
    ]
}, { timestamps: true })

export const Phones = mongoose.model("Phones", mobileSchema)