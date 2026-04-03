import { Bags } from "../models/bagsModal.js";
import connectDB from "../db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const seedingBagsData = [
    {
        bagName: "Wildcraft Alpha 30L Backpack",
        bagImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1774981057/ChatGPT_Image_Mar_30_2026_12_08_05_AM_wnaukj.png"],
        bagBrand: "Wildcraft",
        color: "Midnight Black",
        bagType: "Backpack",
        material: "Nylon",
        capacity: "30L",
        bagCondition: "new",
        category: "Trekking & Outdoor",
        productCategory: "Bags",
        description: {
            highlights: "30L Capacity | Water Resistant Nylon | Ergonomic Back Support | Multiple Compartments | Chest Strap",
            compartments: "1 Main compartment, 2 front zip pockets, 1 side mesh pocket, 1 hidden back pocket",
            material: "600D Water Resistant Nylon with reinforced stitching",
            dimensions: "50cm x 30cm x 20cm",
            extras: "Padded laptop sleeve 15.6 inch, rain cover included, reflective strips"
        },
        currentPrice: 1299,
        oldPrice: 2499,
        discount: 48,
        returning: 1,
        stock: 25,
        reviews: [],
        totalSell: 0
    },
    {
        bagName: "Leather Villa Professional Office Bag",
        bagImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1774981131/ChatGPT_Image_Mar_30_2026_12_09_10_AM_gtisse.png"],
        bagBrand: "Leather Villa",
        color: "Dark Brown",
        bagType: "Office Bag",
        material: "Leather",
        capacity: "15L",
        bagCondition: "new",
        category: "Professional & Office",
        productCategory: "Bags",
        description: {
            highlights: "Genuine Leather | Premium Office Bag | Fits 15.6 Laptop | Magnetic Closure | Professional Look",
            compartments: "1 Main compartment, 1 laptop sleeve, 2 inner organizer pockets, 1 front zip pocket",
            material: "100% Genuine Leather with brass hardware fittings",
            dimensions: "40cm x 30cm x 10cm",
            extras: "Detachable shoulder strap, luggage strap at back, pen holder, card slots"
        },
        currentPrice: 2199,
        oldPrice: 4999,
        discount: 56,
        returning: 1,
        stock: 15,
        reviews: [],
        totalSell: 0
    },
    {
        bagName: "Skybags Juno 46L School Backpack",
        bagImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775159788/ChatGPT_Image_Apr_3_2026_01_26_10_AM_lpwd1l.png"],
        bagBrand: "Skybags",
        color: "Royal Blue",
        bagType: "School Bag",
        material: "Polyester",
        capacity: "46L",
        bagCondition: "new",
        category: "School & College",
        productCategory: "Bags",
        description: {
            highlights: "46L Large Capacity | Waterproof Polyester | Ergonomic Padded Straps | USB Charging Port | Fits 17 inch Laptop",
            compartments: "2 Main compartments, 3 front zip pockets, 2 side water bottle pockets",
            material: "900D Heavy Duty Waterproof Polyester",
            dimensions: "55cm x 35cm x 22cm",
            extras: "Built-in USB charging port, headphone port, padded back panel, whistle buckle chest strap"
        },
        currentPrice: 999,
        oldPrice: 1999,
        discount: 50,
        returning: 1,
        stock: 40,
        reviews: [],
        totalSell: 0
    },
    {
        bagName: "American Tourister Laptop Messenger Bag",
        bagImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1774981186/ChatGPT_Image_Mar_30_2026_12_10_02_AM_npas02.png"],
        bagBrand: "American Tourister",
        color: "Charcoal Grey",
        bagType: "Messenger Bag",
        material: "Nylon",
        capacity: "20L",
        bagCondition: "new",
        category: "Laptop & Travel",
        productCategory: "Bags",
        description: {
            highlights: "20L Capacity | Fits 15.6 Laptop | Water Resistant | Crossbody Design | Lightweight 400g",
            compartments: "1 Padded laptop compartment, 1 main compartment, 2 front organizer pockets, 1 quick access pocket",
            material: "High Density Water Resistant Nylon with metal zippers",
            dimensions: "38cm x 28cm x 12cm",
            extras: "Adjustable shoulder strap with pad, tablet pocket, key holder hook, luggage trolley strap"
        },
        currentPrice: 1599,
        oldPrice: 2999,
        discount: 47,
        returning: 1,
        stock: 20,
        reviews: [],
        totalSell: 0
    },
    {
        bagName: "Safari Duffel Travel Bag 60L",
        bagImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1774981224/ChatGPT_Image_Mar_30_2026_12_10_53_AM_x4wzuz.png"],
        bagBrand: "Safari",
        color: "Olive Green",
        bagType: "Duffel Bag",
        material: "Polyester",
        capacity: "60L",
        bagCondition: "new",
        category: "Travel & Gym",
        productCategory: "Bags",
        description: {
            highlights: "60L Large Capacity | Heavy Duty Polyester | Shoe Compartment | Detachable Shoulder Strap | Weekend Travel",
            compartments: "1 Large main compartment, 1 separate shoe compartment, 2 side zip pockets, 1 front zip pocket",
            material: "1200D Heavy Duty Tear Resistant Polyester with YKK zippers",
            dimensions: "60cm x 35cm x 30cm",
            extras: "Detachable padded shoulder strap, trolley sleeve, wet clothes compartment, grab handles on 3 sides"
        },
        currentPrice: 1899,
        oldPrice: 3499,
        discount: 46,
        returning: 1,
        stock: 18,
        reviews: [],
        totalSell: 0
    }
]


const preDefinedPhoneData = async () => {
    try {
        await connectDB()
        await Bags.deleteMany({})
        const bagsData = await Bags.insertMany(seedingBagsData)
        console.log("Phone data is: ", bagsData)
        process.exit(0)
    }
    catch (err) {
        console.log("Error while connecting to db for seeding data", err)
        process.exit(1)
    }
}

preDefinedPhoneData()