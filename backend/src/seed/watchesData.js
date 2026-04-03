import { Watches } from "../models/watchesModal.js";
import connectDB from "../db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const seedingWatchData = [
    {
        watchName: "Fossil Grant Chronograph",
        watchImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075095/ChatGPT_Image_Apr_2_2026_01_53_22_AM_ryd3eu.png"],
        watchBrand: "Fossil",
        color: "Brown",
        dialSize: 44,
        strapMaterial: "Leather",
        watchCondition: "new",
        category: "Casual",
        productCategory: "Watches",
        description: {
            highlights: "Classic chronograph design with premium leather strap",
            display: "Analog display with Roman numeral markers",
            movement: "Quartz movement",
            waterResistance: "5 ATM water resistant",
            extras: "Date function, scratch-resistant mineral glass"
        },
        currentPrice: 8999,
        oldPrice: 12999,
        discount: 30,
        returning: 1,
        stock: 10,
        reviews: [],
        totalSell: 0
    },
    {
        watchName: "Casio G-Shock GA-2100",
        watchImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075094/ChatGPT_Image_Apr_2_2026_01_53_26_AM_a7iab3.png"],
        watchBrand: "Casio",
        color: "Black",
        dialSize: 45,
        strapMaterial: "Resin",
        watchCondition: "new",
        category: "Sports",
        productCategory: "Watches",
        description: {
            highlights: "Shock resistant rugged sports watch",
            display: "Analog-Digital display",
            movement: "Quartz movement",
            waterResistance: "20 ATM water resistant",
            extras: "World time, stopwatch, LED light"
        },
        currentPrice: 7995,
        oldPrice: 9995,
        discount: 20,
        returning: 1,
        stock: 15,
        reviews: [],
        totalSell: 0
    },
    {
        watchName: "Titan Neo Analog Watch",
        watchImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075095/ChatGPT_Image_Apr_2_2026_01_53_04_AM_qsskek.png"],
        watchBrand: "Titan",
        color: "Blue",
        dialSize: 42,
        strapMaterial: "Stainless Steel",
        watchCondition: "new",
        category: "Formal",
        productCategory: "Watches",
        description: {
            highlights: "Elegant formal watch with metallic finish",
            display: "Analog display with minimalist design",
            movement: "Quartz movement",
            waterResistance: "3 ATM water resistant",
            extras: "Slim case, durable stainless steel strap"
        },
        currentPrice: 5499,
        oldPrice: 7999,
        discount: 31,
        returning: 1,
        stock: 12,
        reviews: [],
        totalSell: 0
    },
    {
        watchName: "Timex Expedition Scout",
        watchImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075095/ChatGPT_Image_Apr_2_2026_01_53_08_AM_rp5gko.png"],
        watchBrand: "Timex",
        color: "Green",
        dialSize: 40,
        strapMaterial: "Fabric",
        watchCondition: "new",
        category: "Outdoor",
        productCategory: "Watches",
        description: {
            highlights: "Durable outdoor watch with military style",
            display: "Analog display with Indiglo backlight",
            movement: "Quartz movement",
            waterResistance: "5 ATM water resistant",
            extras: "Night light feature, lightweight design"
        },
        currentPrice: 4599,
        oldPrice: 6999,
        discount: 34,
        returning: 1,
        stock: 8,
        reviews: [],
        totalSell: 0
    },
    {
        watchName: "Rolex Submariner Automatic",
        watchImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075094/ChatGPT_Image_Apr_2_2026_01_53_11_AM_uq90sm.png"],
        watchBrand: "Rolex",
        color: "Black",
        dialSize: 41,
        strapMaterial: "Stainless Steel",
        watchCondition: "new",
        category: "Luxury",
        productCategory: "Watches",
        description: {
            highlights: "Premium luxury dive watch with iconic design",
            display: "Analog display with luminous markers",
            movement: "Automatic movement",
            waterResistance: "30 ATM water resistant",
            extras: "Sapphire crystal, rotating bezel"
        },
        currentPrice: 850000,
        oldPrice: 900000,
        discount: 6,
        returning: 1,
        stock: 5,
        reviews: [],
        totalSell: 0
    }
];


const preDefinedPhoneData = async () => {
    try {
        await connectDB()
        await Watches.deleteMany({})
        const watchesData = await Watches.insertMany(seedingWatchData)
        console.log("Phone data is: ", watchesData)
        process.exit(0)
    }
    catch (err) {
        console.log("Error while connecting to db for seeding data", err)
        process.exit(1)
    }
}

preDefinedPhoneData()