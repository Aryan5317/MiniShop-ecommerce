import mongoose, { Schema } from "mongoose";

const watchSchema = new Schema({
    watchName: {
        type: String,
        required: [true, "Watch Name is required"]
    },
    watchBrand: {
        type: String,
        required: [true, "Watch Brand is required"]
    },
    dialSize: {
        type: Number, 
        required: true,
    },
    strapMaterial: {
        type: String,
        required: true,
    },
    watchImages: {
        type: [String],
        default: [],
    },
    watchCondition: {
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
        default: "Watches"
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
        movement: {  
            type: String,
            trim: true
        },
        waterResistance: {
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
    }]
}, { timestamps: true });

export const Watches = mongoose.model("Watches", watchSchema);