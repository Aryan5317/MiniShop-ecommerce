import mongoose, { Schema } from "mongoose";

const mensShoeSchema = new Schema({
    shoeName: {
        type: String,
        required: [true, "Shoe Name is required"]
    },
    shoeBrand: {
        type: String,
        required: [true, "Shoe Brand is required"]
    },
    shoeImages: {
        type: [String],
        default: [],
    },
    shoeCondition: {
        type: String,
        required: true,
        default: "new",
        enum: ["old", "new"],
    },
    shoeType: {
        type: String,
        required: true,
        enum: [
            "Sneakers",
            "Sports Shoes",
            "Running Shoes",
            "Boots",
            "Daily Shoes",
            "Loafers",
            "Sandals",
            "Formal Shoes",
            "Casual Shoes",
            "Hiking Shoes"
        ]
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
        enum: ["Leather", "Suede", "Canvas", "Mesh", "Synthetic", "Rubber", "Knit"],
    },
    closure: {
        type: String,
        enum: ["Lace-Up", "Slip-On", "Velcro", "Buckle", "Zipper"],
    },
    sole: {
        type: String,
        enum: ["Rubber", "EVA", "TPU", "Leather", "Synthetic"],
    },
    description: {
        highlights: {
            type: String,
            trim: true
        },
        upperMaterial: {
            type: String,
            trim: true
        },
        soleMaterial: {
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
    sizes: {
        type: [Number],    
        required: [true, "Sizes are required"],
        default: [],
    },
    currentPrice: {
        type: Number,
        required: [true, "Current Price is required"]
    },
    oldPrice: {
        type: Number,
    },
    discount: {
        type: Number,
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
        default: 0,
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
}, { timestamps: true });

export const Shoes = mongoose.model("Shoes", mensShoeSchema);