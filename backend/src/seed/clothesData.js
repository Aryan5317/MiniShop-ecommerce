import { Clothes } from "../models/clothesModal.js";
import connectDB from "../db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})


const seedingClothesData = [
    {
        clothingName: "Allen Solly Classic Cotton Round Neck",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112202/ChatGPT_Image_Apr_2_2026_12_05_40_PM_eypzcj.png"],
        clothingBrand: "Allen Solly",
        color: "White",
        size: ["S", "M", "L", "XL"],
        fit: "Regular Fit",
        fabric: "Cotton",
        sleeveType: "Half Sleeve",
        neckType: "Round Neck",
        collarType: null,
        occasion: null,
        clothingCondition: "new",
        category: "Casual",
        productCategory: "TShirts",
        description: {
            highlights: "100% Cotton | Regular Fit | Round Neck | Half Sleeve | Everyday Casual Wear",
            material: "100% Pure Cotton, 180 GSM, soft and breathable fabric",
            fit: "Regular fit with comfortable chest and shoulder width",
            care: "Machine wash cold, do not bleach, tumble dry low",
            extras: "Ribbed collar, reinforced stitching, pre-shrunk fabric"
        },
        currentPrice: 699,
        oldPrice: 1299,
        discount: 46,
        returning: 1,
        stock: 50,
        reviews: [],
        totalSell: 0
    },
    {
        clothingName: "Nike Dri-FIT Training Tee",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112202/ChatGPT_Image_Apr_2_2026_12_06_10_PM_lqidh8.png"],
        clothingBrand: "Nike",
        color: "Black",
        size: ["S", "M", "L", "XL", "XXL"],
        fit: "Muscle Fit",
        fabric: "Polyester",
        sleeveType: "Half Sleeve",
        neckType: "Round Neck",
        collarType: null,
        occasion: null,
        clothingCondition: "new",
        category: "Sports",
        productCategory: "TShirts",
        description: {
            highlights: "Dri-FIT Technology | Muscle Fit | Moisture Wicking | Sports Performance Tee",
            material: "100% Recycled Polyester with Dri-FIT moisture wicking technology",
            fit: "Muscle fit with stretch fabric for active movement",
            care: "Machine wash cold, do not iron on print, air dry recommended",
            extras: "Reflective Nike swoosh, flatlock seams to reduce chafing, UPF 40+ protection"
        },
        currentPrice: 1499,
        oldPrice: 2499,
        discount: 40,
        returning: 1,
        stock: 35,
        reviews: [],
        totalSell: 0
    },
    {
        clothingName: "H&M Oversized Graphic Drop Shoulder",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112201/ChatGPT_Image_Apr_2_2026_12_07_28_PM_ba9fhy.png"],
        clothingBrand: "H&M",
        color: "Beige",
        size: ["XS", "S", "M", "L", "XL"],
        fit: "Oversized",
        fabric: "Cotton",
        sleeveType: "Full Sleeve",
        neckType: "Round Neck",
        collarType: null,
        occasion: null,
        clothingCondition: "new",
        category: "Streetwear",
        productCategory: "TShirts",
        description: {
            highlights: "Oversized Drop Shoulder | Graphic Print | Full Sleeve | Trendy Streetwear Look",
            material: "100% Cotton jersey, 200 GSM, garment dyed for vintage finish",
            fit: "Oversized fit with dropped shoulders and boxy silhouette",
            care: "Hand wash recommended, wash dark colors separately, do not tumble dry",
            extras: "Chest graphic print, ribbed crew neck, raw hem detail at sleeve"
        },
        currentPrice: 999,
        oldPrice: 1799,
        discount: 44,
        returning: 1,
        stock: 40,
        reviews: [],
        totalSell: 0
    },
    {
        clothingName: "US Polo Assn Classic Polo Tee",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112202/ChatGPT_Image_Apr_2_2026_12_08_18_PM_l2bir2.png"],
        clothingBrand: "US Polo Assn",
        color: "Navy Blue",
        size: ["S", "M", "L", "XL", "XXL", "XXXL"],
        fit: "Slim Fit",
        fabric: "Cotton",
        sleeveType: "Half Sleeve",
        neckType: "Polo",
        collarType: null,
        occasion: null,
        clothingCondition: "new",
        category: "Smart Casual",
        productCategory: "TShirts",
        description: {
            highlights: "Classic Polo Collar | Slim Fit | Premium Pique Cotton | Smart Casual Look",
            material: "100% Pique Cotton, 220 GSM, smooth texture with structured feel",
            fit: "Slim fit with tapered body and structured polo collar",
            care: "Machine wash cold, iron on low heat, do not dry clean",
            extras: "3-button placket, embroidered logo on chest, ribbed collar and cuffs"
        },
        currentPrice: 1199,
        oldPrice: 2199,
        discount: 45,
        returning: 1,
        stock: 30,
        reviews: [],
        totalSell: 0
    },
    {
        clothingName: "Bewakoof Henley Full Sleeve Tee",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112201/ChatGPT_Image_Apr_2_2026_12_08_51_PM_sdf13a.png"],
        clothingBrand: "Bewakoof",
        color: "Olive Green",
        size: ["XS", "S", "M", "L", "XL", "XXL"],
        fit: "Regular Fit",
        fabric: "Blend",
        sleeveType: "Full Sleeve",
        neckType: "Henley",
        collarType: null,
        occasion: null,
        clothingCondition: "new",
        category: "Casual",
        productCategory: "TShirts",
        description: {
            highlights: "Henley Neck | Full Sleeve | Cotton Blend | Relaxed Everyday Casual Wear",
            material: "60% Cotton 40% Polyester blend, 190 GSM, anti-pill finish",
            fit: "Regular fit with relaxed chest and straight hem",
            care: "Machine wash cold, wash inside out to preserve color, do not bleach",
            extras: "3-button Henley placket, contrast buttons, ribbed cuffs and hem"
        },
        currentPrice: 599,
        oldPrice: 999,
        discount: 40,
        returning: 1,
        stock: 60,
        reviews: [],
        totalSell: 0
    },

    // ── SHIRTS ──
    {
        clothingName: "Raymond Slim Fit Formal Shirt",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112201/ChatGPT_Image_Apr_2_2026_12_10_07_PM_cxcwkf.png"],
        clothingBrand: "Raymond",
        color: "Light Blue",
        size: ["S", "M", "L", "XL"],
        fit: "Slim Fit",
        fabric: "Cotton",
        sleeveType: "Full Sleeve",
        neckType: null,
        collarType: "Spread Collar",
        occasion: "Formal",
        clothingCondition: "new",
        category: "Office Wear",
        productCategory: "Shirts",
        description: {
            highlights: "100% Cotton | Slim Fit | Spread Collar | Wrinkle Resistant | Premium Formal Shirt",
            material: "100% Giza Cotton, 80s two-ply yarn, wrinkle resistant finish",
            fit: "Slim fit with shaped body, tapered at waist for a sharp silhouette",
            care: "Machine wash cold, iron on medium heat, dry clean recommended for best results",
            extras: "Mother of pearl buttons, single chest pocket, extra collar stays included"
        },
        currentPrice: 1799,
        oldPrice: 3499,
        discount: 49,
        returning: 1,
        stock: 25,
        reviews: [],
        totalSell: 0
    },
    {
        clothingName: "Levi's Classic Oxford Button-Down",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112201/ChatGPT_Image_Apr_2_2026_12_10_38_PM_odzhkf.png"],
        clothingBrand: "Levi's",
        color: "White",
        size: ["S", "M", "L", "XL", "XXL"],
        fit: "Regular Fit",
        fabric: "Oxford",
        sleeveType: "Full Sleeve",
        neckType: null,
        collarType: "Button-Down",
        occasion: "Casual",
        clothingCondition: "new",
        category: "Casual",
        productCategory: "Shirts",
        description: {
            highlights: "Oxford Fabric | Button-Down Collar | Regular Fit | Versatile Casual Shirt",
            material: "100% Oxford Weave Cotton, 130 GSM, textured yet soft feel",
            fit: "Regular fit with classic straight cut for all-day comfort",
            care: "Machine wash warm, tumble dry medium, iron on medium heat",
            extras: "Box pleat at back yoke, locker loop, signature Levi's tab on chest pocket"
        },
        currentPrice: 1499,
        oldPrice: 2799,
        discount: 46,
        returning: 1,
        stock: 30,
        reviews: [],
        totalSell: 0
    },
    {
        clothingName: "Manyavar Mandarin Collar Ethnic Shirt",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112201/ChatGPT_Image_Apr_2_2026_12_11_11_PM_kwjb8l.png"],
        clothingBrand: "Manyavar",
        color: "Maroon",
        size: ["S", "M", "L", "XL", "XXL", "XXXL"],
        fit: "Regular Fit",
        fabric: "Blend",
        sleeveType: "Full Sleeve",
        neckType: null,
        collarType: "Mandarin",
        occasion: "Party",
        clothingCondition: "new",
        category: "Ethnic & Festive",
        productCategory: "Shirts",
        description: {
            highlights: "Mandarin Collar | Festive Wear | Subtle Jacquard Weave | Premium Party Shirt",
            material: "55% Polyester 45% Viscose blend with jacquard woven pattern",
            fit: "Regular fit with straight hem designed for kurta-style layering",
            care: "Dry clean recommended, hand wash in cold water with mild detergent",
            extras: "Contrast placket stitching, Chinese knot buttons, straight hem for untucked wear"
        },
        currentPrice: 2499,
        oldPrice: 4999,
        discount: 50,
        returning: 1,
        stock: 20,
        reviews: [],
        totalSell: 0
    },
    {
        clothingName: "Van Heusen Tailored Fit Business Shirt",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112201/ChatGPT_Image_Apr_2_2026_12_12_13_PM_bf3dtd.png"],
        clothingBrand: "Van Heusen",
        color: "Charcoal Grey",
        size: ["S", "M", "L", "XL", "XXL"],
        fit: "Tailored Fit",
        fabric: "Blend",
        sleeveType: "Full Sleeve",
        neckType: null,
        collarType: "Point Collar",
        occasion: "Business",
        clothingCondition: "new",
        category: "Business & Corporate",
        productCategory: "Shirts",
        description: {
            highlights: "Tailored Fit | Point Collar | Anti-Wrinkle | Business Professional Shirt",
            material: "60% Cotton 40% Polyester, anti-wrinkle and moisture-wicking finish",
            fit: "Tailored fit with darted back for a sharp professional silhouette",
            care: "Machine wash cold, tumble dry low, iron on medium, do not bleach",
            extras: "Fused collar for all-day shape retention, adjustable barrel cuffs, stretch fabric"
        },
        currentPrice: 1999,
        oldPrice: 3799,
        discount: 47,
        returning: 1,
        stock: 22,
        reviews: [],
        totalSell: 0
    },
    {
        clothingName: "Zara Linen Relaxed Fit Half Sleeve",
        clothingImages: ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775112200/ChatGPT_Image_Apr_2_2026_12_12_35_PM_fcp41q.png"],
        clothingBrand: "Zara",
        color: "Sand Beige",
        size: ["XS", "S", "M", "L", "XL"],
        fit: "Relaxed Fit",
        fabric: "Linen",
        sleeveType: "Half Sleeve",
        neckType: null,
        collarType: "Spread Collar",
        occasion: "Casual",
        clothingCondition: "new",
        category: "Summer & Beach",
        productCategory: "Shirts",
        description: {
            highlights: "Pure Linen | Relaxed Fit | Half Sleeve | Breathable Summer Casual Shirt",
            material: "100% European Linen, 120 GSM, naturally breathable and anti-bacterial",
            fit: "Relaxed fit with boxy silhouette ideal for warm weather and beach outings",
            care: "Hand wash in cold water, lay flat to dry, warm iron while slightly damp",
            extras: "Coconut shell buttons, chest patch pocket, curved hem for easy untucked styling"
        },
        currentPrice: 2299,
        oldPrice: 3999,
        discount: 43,
        returning: 1,
        stock: 18,
        reviews: [],
        totalSell: 0
    }
];
const preDefinedClothesData = async () => {
    try {
        await connectDB()
        await Clothes.deleteMany({})
        const cothesData = await Clothes.insertMany(seedingClothesData)
        console.log("Clothes data is: ", cothesData)
        process.exit(0)
    }
    catch (err) {
        console.log("Error while connecting to db for seeding data", err)
        process.exit(1)
    }
}

preDefinedClothesData()