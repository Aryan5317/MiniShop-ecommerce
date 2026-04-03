import mongoose, { Schema } from "mongoose";

const clothesSchema = new Schema({
    clothingName: {
        type: String,
        required: [true, "Clothing Name is required"]
    },
    clothingBrand: {
        type: String,
        required: [true, "Clothing Brand is required"]
    },
    size: {
        type: [String],
        required: true,
        enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
        default: [],
    },
    fit: {
        type: String,
        required: true,
        enum: ["Slim Fit", "Regular Fit", "Oversized", "Muscle Fit", "Relaxed Fit", "Tailored Fit"],
    },
    fabric: {
        type: String,
        required: true,
        enum: ["Cotton", "Polyester", "Linen", "Blend", "Bamboo", "Oxford", "Silk"],
    },
    sleeveType: {
        type: String,
        required: true,
        enum: ["Half Sleeve", "Full Sleeve", "Sleeveless", "Rolled Sleeve"],
    },
    neckType: {
        type: String,
        enum: ["Round Neck", "V-Neck", "Polo", "Henley"],
        default: null,
    },
    collarType: {
        type: String,
        enum: ["Spread Collar", "Button-Down", "Mandarin", "Point Collar"],
        default: null,
    },
    occasion: {
        type: String,
        enum: ["Casual", "Formal", "Party", "Business"],
        default: null,
    },
    clothingImages: {
        type: [String],
        default: [],
    },
    clothingCondition: {
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
        enum: ["TShirts", "Shirts"],         
    },
    description: {
        highlights: {
            type: String,
            trim: true
        },
        material: {
            type: String,
            trim: true
        },
        fit: {
            type: String,
            trim: true
        },
        care: {
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

export const Clothes = mongoose.model("Clothes", clothesSchema);