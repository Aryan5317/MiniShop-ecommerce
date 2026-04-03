import { Phones } from "../models/phoneModal.js";
import connectDB from "../db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const seedingPhoneData = [
    {
        phoneName: "Redmi A3", phoneImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1772697728/Redmi_A3images_rwxao2.webp"], phoneBrand: "Redmi", color: "Olive Green", phoneStorage: 128, phoneRam: 4, phoneCondition: "new", category: "Ultra Budget", productCategory: "Phones",
        description: {
            highlights: "Premium Halo Design | MediaTek Helio G36 | 6.71 HD+ 90Hz Display | Up to 8GB RAM | Up to 128GB Storage",
            display: "17.04cm 90Hz display with Gorilla Glass 3",
            camera: "8MP AI Dual camera, 5MP front camera",
            battery: "5000mAh battery with 10W charger",
            extras: "Expandable storage 1TB, Bluetooth 5.4, Android 14, Side fingerprint"
        }, currentPrice: 7239, oldPrice: 11990, discount: 47, returning: 0, addToCart: false, stock: 10, reviews: [], totalSell: 0
    },
    {
        phoneName: "Realme C51", phoneBrand: "Realme", phoneImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1772698172/Realme_C51_llfmfx.webp"], color: "Mint Green", phoneStorage: 64, phoneRam: 4, phoneCondition: "new", category: "Ultra Budget", productCategory: "Phones",
        description: {
            highlights: "Powerful T612 processor with 4GB RAM and 64GB internal storage, expandable up to 2TB",
            display: "6.74-inch (17.12 cm) HD display",
            camera: "50MP + 0.08MP dual rear camera with 5MP front camera",
            battery: "5000mAh long-lasting battery",
            extras: "Expandable storage up to 2TB for additional space"
        }, currentPrice: 8999, oldPrice: 11000, discount: 20, returning: 0, addToCart: false, stock: 10, reviews: [], totalSell: 0
    },
    {
        phoneName: "Samsung Galaxy A05", phoneBrand: "Samsung", phoneImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1772698160/Samsung_Galaxy_A05_rwv7le.webp"], color: "Light Green", phoneStorage: 128, phoneRam: 6, phoneCondition: "new", category: "Budget", productCategory: "Phones",
        description: {
            highlights: "MediaTek Helio G85 octa-core processor with Android 13 and One UI Core 5.1, offering smooth performance and up to 2 generations of Android OS upgrades with 4 years of security updates",
            display: "6.7-inch (17.13 cm) PLS LCD HD+ display with 720 x 1600 resolution, 260 PPI, 16M colors and 60Hz refresh rate",
            camera: "50MP (f/1.8) main camera with autofocus + 2MP depth camera, and 8MP (f/2.0) front camera",
            battery: "5000mAh non-removable lithium-ion battery with USB Type-C and 25W fast charging support",
            extras: "Android 13 OS with One UI Core 5.1, Samsung software support with 2 Android upgrades and 4 years security updates, 1-year device warranty and 6 months warranty on in-box accessories"
        }, currentPrice: 12999, oldPrice: 14999, discount: 20, returning: 0, addToCart: false, stock: 10, reviews: [], totalSell: 0
    },
    {
        phoneName: "Tecno Spark Go 2024", phoneBrand: "Tecno", phoneImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1772698160/Tecno_Spark_Go_2024_ggii11.webp"], color: "Gravity Black", phoneStorage: 64, phoneRam: 4, phoneCondition: "new", category: "Ultra Budget", productCategory: "Phones",
        description: {
            highlights: "Premium flagship design with strong durability, drop resistance and IP64 protection against dust and splashes",
            display: "Smooth 120Hz display offering ultra-fluid scrolling and responsive visuals for browsing, videos and daily use",
            camera: "Optimized camera system for everyday photography and video calls",
            battery: "5000mAh long-lasting battery designed for extended usage without frequent charging",
            extras: "Network-free calling support in limited range, Ella AI assistant supporting regional languages, durable build for everyday protection"
        },
        currentPrice: 8999, oldPrice: 11999, discount: 30, returning: 0, addToCart: false, stock: 10, reviews: [], totalSell: 0
    },
    {
        phoneName: "Tecno Spark Go 2024", phoneBrand: "Tecno", phoneImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1772698160/Tecno_Spark_Go_2024_ggii11.webp"], color: "Gravity Black", phoneStorage: 64, phoneRam: 4, phoneCondition: "new", category: "Ultra Budget", productCategory: "Phones",
        description: {
            highlights: "Premium flagship design with strong durability, drop resistance and IP64 protection against dust and splashes",
            display: "Smooth 120Hz display offering ultra-fluid scrolling and responsive visuals for browsing, videos and daily use",
            camera: "Optimized camera system for everyday photography and video calls",
            battery: "5000mAh long-lasting battery designed for extended usage without frequent charging",
            extras: "Network-free calling support in limited range, Ella AI assistant supporting regional languages, durable build for everyday protection"
        },
        currentPrice: 8999, oldPrice: 11999, discount: 30, returning: 0, addToCart: false, stock: 10, reviews: [], totalSell: 0
    },


]

const preDefinedPhoneData = async () => {
    try {
        await connectDB()
        await Phones.deleteMany({})
        const phoneData = await Phones.insertMany(seedingPhoneData)
        console.log("Phone data is: ", phoneData)
        process.exit(0)
    }
    catch (err) {
        console.log("Error while connecting to db for seeding data", err)
        process.exit(1)
    }
}

preDefinedPhoneData()