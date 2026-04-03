import { Shoes } from "../models/shoesModal.js";
import connectDB from "../db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const seedingShoesData = [
    {
        shoeName: "Nike Air Max Sneakers",
        shoeImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075842/ChatGPT_Image_Apr_2_2026_02_02_46_AM_qeqvpk.png"],
        shoeBrand: "Nike",
        color: "Black",
        shoeCondition: "new",
        shoeType: "Sneakers",
        category: "Casual",
        productCategory: "Shoes",
        material: "Mesh",
        closure: "Lace-Up",
        sole: "Rubber",
        sizes: [7, 8, 9, 10, 11],
        description: {
            highlights: "Breathable Mesh | Air Cushioning | Lightweight Design",
            upperMaterial: "Premium mesh upper for ventilation",
            soleMaterial: "Durable rubber outsole with air cushioning",
            dimensions: "Heel Height: 1.2 inches",
            extras: "Shock absorption, stylish design"
        },
        currentPrice: 4999,
        oldPrice: 7999,
        discount: 38,
        returning: 1,
        stock: 20,
        reviews: [],
        totalSell: 0
    },

    {
        shoeName: "Adidas Ultraboost Running Shoes",
        shoeImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075842/ChatGPT_Image_Apr_2_2026_02_01_00_AM_zihzeh.png"],
        shoeBrand: "Adidas",
        color: "White",
        shoeCondition: "new",
        shoeType: "Running Shoes",
        category: "Sports",
        productCategory: "Shoes",
        material: "Knit",
        closure: "Lace-Up",
        sole: "EVA",
        sizes: [6, 7, 8, 9, 10],
        description: {
            highlights: "Boost Cushioning | High Energy Return | Running Comfort",
            upperMaterial: "Stretchable knit upper",
            soleMaterial: "EVA midsole with boost technology",
            dimensions: "Heel Height: 1.5 inches",
            extras: "High grip sole, lightweight performance"
        },
        currentPrice: 8999,
        oldPrice: 12999,
        discount: 30,
        returning: 1,
        stock: 15,
        reviews: [],
        totalSell: 0
    },

    {
        shoeName: "Woodland Leather Boots",
        shoeImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075842/ChatGPT_Image_Apr_2_2026_02_02_43_AM_ck2idt.png"],
        shoeBrand: "Woodland",
        color: "Brown",
        shoeCondition: "new",
        shoeType: "Boots",
        category: "Outdoor",
        productCategory: "Shoes",
        material: "Leather",
        closure: "Lace-Up",
        sole: "Rubber",
        sizes: [8, 9, 10, 11],
        description: {
            highlights: "Genuine Leather | Rugged Build | Outdoor Ready",
            upperMaterial: "Full grain leather upper",
            soleMaterial: "Heavy duty rubber sole",
            dimensions: "Heel Height: 1.8 inches",
            extras: "Water resistant, anti-slip grip"
        },
        currentPrice: 5999,
        oldPrice: 8999,
        discount: 33,
        returning: 1,
        stock: 10,
        reviews: [],
        totalSell: 0
    },

    {
        shoeName: "Bata Formal Leather Shoes",
        shoeImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075842/ChatGPT_Image_Apr_2_2026_02_06_37_AM_mduznw.png"],
        shoeBrand: "Bata",
        color: "Black",
        shoeCondition: "new",
        shoeType: "Formal Shoes",
        category: "Formal",
        productCategory: "Shoes",
        material: "Leather",
        closure: "Slip-On",
        sole: "Leather",
        sizes: [7, 8, 9, 10],
        description: {
            highlights: "Elegant Design | Office Wear | Premium Finish",
            upperMaterial: "Smooth leather upper",
            soleMaterial: "Leather sole for premium feel",
            dimensions: "Heel Height: 1 inch",
            extras: "Comfort padding, durable stitching"
        },
        currentPrice: 3499,
        oldPrice: 5999,
        discount: 41,
        returning: 1,
        stock: 25,
        reviews: [],
        totalSell: 0
    },

    {
        shoeName: "Puma Sports Training Shoes",
        shoeImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775075842/ChatGPT_Image_Apr_2_2026_02_06_44_AM_zstnpf.png"],
        shoeBrand: "Puma",
        color: "Blue",
        shoeCondition: "new",
        shoeType: "Sports Shoes",
        category: "Gym",
        productCategory: "Shoes",
        material: "Synthetic",
        closure: "Lace-Up",
        sole: "TPU",
        sizes: [6, 7, 8, 9, 10, 11],
        description: {
            highlights: "Training Shoes | Flexible Sole | Lightweight",
            upperMaterial: "Synthetic upper with ventilation",
            soleMaterial: "TPU sole for flexibility",
            dimensions: "Heel Height: 1.3 inches",
            extras: "Anti-slip sole, gym ready design"
        },
        currentPrice: 2999,
        oldPrice: 4999,
        discount: 40,
        returning: 1,
        stock: 18,
        reviews: [],
        totalSell: 0
    }
];

const preDefinedShoesData = async () => {
    try {
        await connectDB()
        await Shoes.deleteMany({})
        const shoesData = await Shoes.insertMany(seedingShoesData)
        console.log("Shoes data is: ", shoesData)
        process.exit(0)
    }
    catch (err) {
        console.log("Error while connecting to db for seeding data", err)
        process.exit(1)
    }
}

preDefinedShoesData()