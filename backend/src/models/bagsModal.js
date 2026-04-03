import mongoose, { Schema } from "mongoose";

const bagsSchema = new Schema({
    bagName: {
        type: String,
        required: [true, "Bag Name is required"]
    },
    bagBrand: {
        type: String,
        required: [true, "Bag Brand is required"]
    },
    bagImages: {
        type: [String],
        default: [],
    },
    bagCondition: {
        type: String,
        required: true,
        default: "new",
        enum: ["old", "new"],
    },
    bagType: {
        type: String,
        required: true,
        enum: ["Backpack", "Laptop Bag", "Office Bag", "Messenger Bag", "Duffel Bag", "Travel Bag", "School Bag"]
    },
    category: {
        type: String,
    },
    productCategory: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        enum: ["Leather", "Canvas", "Nylon", "Polyester", "Oxford"],
    },
    capacity: {
        type: String, 
    },
    description: {
        highlights: {
            type: String,
            trim: true
        },
        compartments: {
            type: String,
            trim: true
        },
        material: {
            type: String,
            trim: true
        },
        dimensions: {
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
    reviews: [
        {
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

export const Bags = mongoose.model("Bags", bagsSchema)