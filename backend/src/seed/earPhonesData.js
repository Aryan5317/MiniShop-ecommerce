import { Earphones } from "../models/earPhonesModal.js";
import connectDB from "../db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const seedingEarphonesData = [
    {
        earphonesName: "boAt Airdopes 141",
        earphonesImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775076238/ChatGPT_Image_Apr_2_2026_02_11_18_AM_tastzm.png"],
        earphonesBrand: "boAt",
        color: "Black",
        earphonesCondition: "new",
        earphonesType: "TWS",
        connectivity: "Wireless",
        category: "Budget",
        batteryLife: "42 hours total playback",
        chargingTime: "1.5 hours",
        driverSize: "8mm",
        frequencyResponse: "20Hz - 20kHz",
        noiseCancellation: "Passive Noise Cancellation",
        microphoneType: "Built-in Mic",
        waterResistance: "IPX4",
        productCategory: "Earphones",
        description: {
            highlights: "42Hr Battery | ENx Tech | IPX4 | Fast Charge",
            sound: "8mm drivers delivering deep bass and clear vocals",
            connectivity: "Bluetooth 5.0 with 10m range",
            battery: "42 hours playback, ASAP charge support",
            extras: "Touch controls, voice assistant support"
        },
        currentPrice: 1299,
        oldPrice: 2999,
        discount: 57,
        returning: 1,
        stock: 30,
        reviews: [],
        totalSell: 0
    },

    {
        earphonesName: "Sony WH-CH520",
        earphonesImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775076238/ChatGPT_Image_Apr_2_2026_02_11_29_AM_brqt4b.png"],
        earphonesBrand: "Sony",
        color: "Blue",
        earphonesCondition: "new",
        earphonesType: "On-Ear Headphones",
        connectivity: "Wireless",
        category: "Premium",
        batteryLife: "50 hours",
        chargingTime: "2 hours",
        driverSize: "30mm",
        frequencyResponse: "20Hz - 20kHz",
        noiseCancellation: "None",
        microphoneType: "Built-in Mic",
        waterResistance: "None",
        productCategory: "Earphones",
        description: {
            highlights: "50Hr Battery | Lightweight | Clear Sound",
            sound: "High-quality sound with balanced tuning",
            connectivity: "Bluetooth 5.2, multipoint connection",
            battery: "50 hours playback, quick charge support",
            extras: "Voice assistant, foldable design"
        },
        currentPrice: 4490,
        oldPrice: 5990,
        discount: 25,
        returning: 1,
        stock: 20,
        reviews: [],
        totalSell: 0
    },

    {
        earphonesName: "JBL Quantum 100 Gaming Headset",
        earphonesImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775076238/ChatGPT_Image_Apr_2_2026_02_11_56_AM_hhkbfh.png"],
        earphonesBrand: "JBL",
        color: "Black",
        earphonesCondition: "new",
        earphonesType: "Gaming Headset",
        connectivity: "Wired",
        category: "Gaming",
        batteryLife: null,
        chargingTime: null,
        driverSize: "40mm",
        frequencyResponse: "20Hz - 20kHz",
        noiseCancellation: "Passive Noise Cancellation",
        microphoneType: "Detachable Mic",
        waterResistance: "None",
        productCategory: "Earphones",
        description: {
            highlights: "40mm Drivers | Detachable Mic | Gaming Sound",
            sound: "JBL Quantum Sound Signature for gaming",
            connectivity: "3.5mm wired connection",
            battery: "No battery required (wired)",
            extras: "Lightweight, memory foam ear cushions"
        },
        currentPrice: 1999,
        oldPrice: 2999,
        discount: 33,
        returning: 1,
        stock: 25,
        reviews: [],
        totalSell: 0
    },

    {
        earphonesName: "Realme Buds Wireless 3",
        earphonesImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775076238/ChatGPT_Image_Apr_2_2026_02_12_39_AM_tcivlh.png"],
        earphonesBrand: "Realme",
        color: "Yellow",
        earphonesCondition: "new",
        earphonesType: "Neckband",
        connectivity: "Wireless",
        category: "Sports",
        batteryLife: "30 hours",
        chargingTime: "2 hours",
        driverSize: "13.6mm",
        frequencyResponse: "20Hz - 20kHz",
        noiseCancellation: "Active Noise Cancellation",
        microphoneType: "Built-in Mic",
        waterResistance: "IPX5",
        productCategory: "Earphones",
        description: {
            highlights: "30Hr Battery | ANC | Fast Charge",
            sound: "Large drivers with deep bass and clear highs",
            connectivity: "Bluetooth 5.3 with low latency",
            battery: "30 hours playback, fast charging",
            extras: "Magnetic earbuds, gaming mode"
        },
        currentPrice: 1799,
        oldPrice: 2999,
        discount: 40,
        returning: 1,
        stock: 18,
        reviews: [],
        totalSell: 0
    },

    {
        earphonesName: "Apple AirPods Pro (2nd Gen)",
        earphonesImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775076238/ChatGPT_Image_Apr_2_2026_02_13_33_AM_jnl85r.png"],
        earphonesBrand: "Apple",
        color: "White",
        earphonesCondition: "new",
        earphonesType: "In-Ear Wireless",
        connectivity: "Wireless",
        category: "Premium",
        batteryLife: "30 hours with case",
        chargingTime: "1 hour",
        driverSize: "Custom",
        frequencyResponse: "20Hz - 20kHz",
        noiseCancellation: "Active Noise Cancellation",
        microphoneType: "Built-in Mic",
        waterResistance: "IPX4",
        productCategory: "Earphones",
        description: {
            highlights: "ANC | Spatial Audio | Transparency Mode",
            sound: "Adaptive EQ with immersive sound",
            connectivity: "Bluetooth 5.3, Apple ecosystem optimized",
            battery: "30 hours with case, fast charging",
            extras: "Transparency mode, touch control, Siri support"
        },
        currentPrice: 24900,
        oldPrice: 26900,
        discount: 7,
        returning: 1,
        stock: 10,
        reviews: [],
        totalSell: 0
    }
];

const preDefinedEarPhonesData = async () => {
    try {
        await connectDB()
        await Earphones.deleteMany({})
        const earPhonesData = await Earphones.insertMany(seedingEarphonesData)
        console.log("EarPhones data is: ", earPhonesData)
        process.exit(0)
    }
    catch (err) {
        console.log("Error while connecting to db for seeding data", err)
        process.exit(1)
    }
}

preDefinedEarPhonesData()