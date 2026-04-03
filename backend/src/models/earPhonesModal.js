import mongoose, { Schema } from "mongoose";

const earphonesSchema = new Schema({
    earphonesName: {
        type: String,
        required: [true, "Earphones Name is required"]
    },
    earphonesBrand: {
        type: String,
        required: [true, "Earphones Brand is required"]
    },
    earphonesImages: {
        type: [String],
        default: [],
    },
    earphonesCondition: {
        type: String,
        required: true,
        default: "new",
        enum: ["old", "new"],
    },

    earphonesType: {
        type: String,
        required: true,
        enum: [
            "In-Ear Wired",         
            "In-Ear Wireless",      
            "Over-Ear Headphones",  
            "On-Ear Headphones",    
            "Neckband",             
            "TWS",                  
            "Gaming Headset",       
        ]
    },

    connectivity: {
        type: String,
        required: true,
        enum: ["Wired", "Wireless", "Both"]
    },

    category: {
        type: String,
    },

    productCategory: {
        type: String,
        required: true,
        default: "Earphones"
    },

    batteryLife: {
        type: String,   
    },

    chargingTime: {
        type: String,   
    },

    driverSize: {
        type: String,   
    },

    frequencyResponse: {
        type: String,   
    },

    noiseCancellation: {
        type: String,
        enum: ["Active Noise Cancellation", "Passive Noise Cancellation", "None"],
        default: "None"
    },

    microphoneType: {
        type: String,
        enum: ["Built-in Mic", "No Mic", "Detachable Mic"],
        default: "Built-in Mic"
    },

    waterResistance: {
        type: String,
        enum: ["IPX4", "IPX5", "IPX6", "IPX7", "None"],
        default: "None"
    },

    description: {
        highlights: {
            type: String,
            trim: true
        },
        sound: {
            type: String,
            trim: true
        },
        connectivity: {
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

export const Earphones = mongoose.model("Earphones", earphonesSchema)