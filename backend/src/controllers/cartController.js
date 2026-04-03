import { Cart } from "../models/cartModal.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/errorHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Phones } from "../models/phoneModal.js";
import mongoose from "mongoose"
import { Orders } from "../models/userOrderModal.js";
import { Bags } from "../models/bagsModal.js";
import { Watches } from "../models/watchesModal.js";
import { Clothes } from "../models/clothesModal.js";
import { Earphones } from "../models/earPhonesModal.js";
import { Shoes } from "../models/shoesModal.js";

const getCartDetails = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id;
    if (!looginedInUser) {
        throw new ApiError(500, "UnAuthorized User")
    }
    console.log("Loogined User id: ", looginedInUser);
    const findUserCartDetails = await Cart.findOne({ userId: looginedInUser })
    console.log("User Cart data are: ", findUserCartDetails);
    return res.status(200)
        .json(new ApiResponse(200, { cartDetails: findUserCartDetails }, "User Cart details fetched"))
})

const addToCart = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id
    if (!looginedInUser) {
        throw new ApiError(500, "Unable to get the userId");
    }

    const { productId, category, addToCart } = req.body;
    console.log("Product id from frontend is: ", productId);
    console.log("Category from frontend is: ", category);
    console.log("Add to cart from frontend is: ", addToCart);

    const categoryModelMap = {
        "Phones": Phones,
        "Bags": Bags,
        "Watches": Watches,
        "Clothes": Clothes,
        "Earphones": Earphones,
        "Shoes": Shoes,
    }

    const ProductModel = categoryModelMap[category]
    if (!ProductModel) {
        throw new ApiError(400, `Invalid category: ${category}`);
    }
    console.log("Get Product Category is: ", ProductModel)
    const findProduct = await ProductModel.findById(productId)
    console.log("Product details fetched: ", findProduct)
    if (!findProduct) {
        throw new ApiError(500, "Error while finding the product");
    }

    const commonFields = {
        productID: productId,
        productCategory: findProduct.productCategory,
        category: findProduct.category,
        price: findProduct.currentPrice,
        discount: findProduct.discount,
        color: findProduct.color,
        oldPrice: findProduct.oldPrice,
        description: findProduct.description.highlights,
        rating: findProduct.reviews?.[0]?.rating || 0,
        returning: findProduct.returning,
    }

    let categorySpecificFields = {}

    if (category === "Phones") {
        categorySpecificFields = {
            productName: findProduct.phoneName,
            productBrand: findProduct.phoneBrand,
            productImages: findProduct.phoneImages,
            phoneStorage: findProduct.phoneStorage,
            phoneRam: findProduct.phoneRam,
            phoneCondition: findProduct.phoneCondition,
            bagType: null,
            material: null,
            capacity: null,
        }
    }

    else if (category === "Bags") {
        categorySpecificFields = {
            productName: findProduct.bagName,
            productBrand: findProduct.bagBrand,
            productImages: findProduct.bagImages,
            bagType: findProduct.bagType,
            material: findProduct.material,
            capacity: findProduct.capacity,
            bagCondition: findProduct.bagCondition,
            phoneStorage: null,
            phoneRam: null,
        }
    }
    else if (category === "Watches") {
        categorySpecificFields = {
            productName: findProduct.watchName,
            productBrand: findProduct.watchBrand,
            productImages: findProduct.watchImages,
            dialSize: findProduct.dialSize,
            strapMaterial: findProduct.strapMaterial,
            watchCondition: findProduct.watchCondition,
            phoneStorage: null,
            phoneRam: null,
            bagType: null,
            material: null,
            capacity: null,
        }
    }
    else if (category === "Clothes") {
        categorySpecificFields = {
            productName: findProduct.clothingName,
            productBrand: findProduct.clothingBrand,
            productImages: findProduct.clothingImages,
            size: findProduct.size,
            fit: findProduct.fit,
            fabric: findProduct.fabric,
            sleeveType: findProduct.sleeveType,
            clothingCondition: findProduct.clothingCondition,
            neckType: findProduct.neckType || null,
            collarType: findProduct.collarType || null,
            occasion: findProduct.occasion || null,
            phoneStorage: null,
            phoneRam: null,
            bagType: null,
            material: null,
            capacity: null,
            dialSize: null,
            strapMaterial: null,
        }
    }
    else if (category === "Earphones") {
        categorySpecificFields = {
            productName: findProduct.earphonesName,
            productBrand: findProduct.earphonesBrand,
            productImages: findProduct.earphonesImages,
            earphonesType: findProduct.earphonesType,
            connectivity: findProduct.connectivity,
            batteryLife: findProduct.batteryLife,
            chargingTime: findProduct.chargingTime,
            driverSize: findProduct.driverSize,
            frequencyResponse: findProduct.frequencyResponse,
            noiseCancellation: findProduct.noiseCancellation,
            microphoneType: findProduct.microphoneType,
            waterResistance: findProduct.waterResistance,
            earphonesCondition: findProduct.earphonesCondition,
            phoneStorage: null,
            phoneRam: null,
            bagType: null,
            material: null,
            capacity: null,
            dialSize: null,
            strapMaterial: null,
            size: null,
            fit: null,
            fabric: null,
            sleeveType: null,
            clothingCondition: null,
            neckType: null,
            collarType: null,
            occasion: null,
        }
    }
    else if (category === "Shoes") {
        categorySpecificFields = {
            productName: findProduct.shoeName,
            productBrand: findProduct.shoeBrand,
            productImages: findProduct.shoeImages,
            shoeType: findProduct.shoeType,
            material: findProduct.material,
            closure: findProduct.closure,
            sole: findProduct.sole,
            sizes: findProduct.sizes,
            shoeCondition: findProduct.shoeCondition,
            phoneStorage: null,
            phoneRam: null,
            bagType: null,
            capacity: null,
            dialSize: null,
            strapMaterial: null,
            size: null,
            fit: null,
            fabric: null,
            sleeveType: null,
            clothingCondition: null,
            neckType: null,
            collarType: null,
            occasion: null,
            earphonesType: null,
            connectivity: null,
            batteryLife: null,
            chargingTime: null,
            driverSize: null,
            frequencyResponse: null,
            noiseCancellation: null,
            microphoneType: null,
            waterResistance: null,
            earphonesCondition: null,
        }
    }
    const productDetails = {
        ...commonFields,
        ...categorySpecificFields
    }

    console.log("Final product details for cart: ", productDetails)
    const getCartUser = await Cart.findOne({ userId: looginedInUser })

    if (getCartUser) {
        const productCart = await Cart.findOne({
            userId: looginedInUser,
            orders: { $elemMatch: { productID: productId } }
        })

        if (!productCart) {
            getCartUser.orders.push(productDetails)
            await getCartUser.save({ validateBeforeSave: false })
            console.log("Product pushed to existing cart")
        } else {
            console.log("Product already exists in cart")
        }
    } else {
        const newCartProduct = await Cart.create({
            userId: looginedInUser,
            orders: [productDetails]
        })
        console.log("New Cart created: ", newCartProduct)
    }

    return res.status(200)
        .json(new ApiResponse(
            200, {}, "Product Added to cart"
        ))
})

const removeCart = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id;
    if (!looginedInUser) {
        throw new ApiError(500, "UnAuthorized User")
    }
    console.log("Loogged in user id: ", looginedInUser)
    const { ID, flag } = req.body;
    console.log("Product id for removing cart: ", ID)
    console.log("Flag for product id: ", flag)
    const findUser = await Cart.findOne({ userId: looginedInUser })
    if (!findUser) {
        throw new ApiError(504, "No cart order find for the user")
    }
    console.log("Find User: ", findUser)
    const userCart = await Cart.findOneAndUpdate(
        { userId: looginedInUser },
        { $pull: { orders: { _id: new mongoose.Types.ObjectId(ID) } } }
    )
    if (!userCart) {
        throw new ApiError(404, "No cart found for the user")
    }
    console.log("User Cart is: ", userCart)
    return res.status(200)
        .json(new ApiResponse(200, { updatedCart: userCart }, "Product removed from cart"))

})

const cartOrderCompletion = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id;
    if (!looginedInUser) {
        throw new ApiError(500, "UnAuthorized User")
    }
    console.log("Loogged in user id: ", looginedInUser)
    const { category, productId } = req.body;
    console.log("Category are: ", category)
    console.log("Category length are: ", category.length)

    console.log("Product ID are: ", productId)
    console.log("Product length ID are: ", productId.length)

    const findUser = await Cart.findOne({ userId: looginedInUser })
    if (!findUser) {
        throw new ApiError(504, "No cart order find for the user")
    }
    if (category.length != productId.length) {
        throw new ApiError(505, "Product ID and category count mismatch")
    }
    const categoryModelMap = {
        "Phones": Phones,
    }
    for (let i = 0; i < category.length; i++) {
        const Category = category[i].category
        const Product = productId[i].productId
        console.log("Product a", Product)
        console.log("Category c", Category)
        const modal = categoryModelMap[Category]
        if (modal) {
            const productDetails = await modal.findById(Product)
            console.log("Product details: ", productDetails)
            productDetails.stock = productDetails.stock - 1;
            productDetails.totalSell = productDetails.totalSell + 1;
            await productDetails.save();
            const updateUserOrderHistory = await Orders.findOne({ userId: looginedInUser })
            const PurchaseDate = new Date()
            if (updateUserOrderHistory === null) {
                console.log("No order found for the user");
                const newOrder = await Orders.create({
                    userId: looginedInUser,
                    orders: [
                        {
                            productID: Product,
                            category: Category,
                            name: productDetails.phoneName,
                            price: productDetails.currentPrice,
                            phoneImages: productDetails.phoneImages[0],
                            discount: productDetails.discount,
                            returning: 0,
                            quantity: 1,
                            totalCost: productDetails.currentPrice,
                            date: PurchaseDate.toLocaleDateString(),
                        }
                    ]
                })
                console.log("New Order is: ", newOrder)
            }
            else {
                updateUserOrderHistory.orders.push({
                    productID: Product,
                    category: Category,
                    name: productDetails.phoneName,
                    price: productDetails.currentPrice,
                    phoneImages: productDetails.phoneImages[0],
                    discount: productDetails.discount,
                    returning: 0,
                    quantity: 1,
                    totalCost: productDetails.currentPrice,
                    date: PurchaseDate.toLocaleDateString(),
                })
            }
            await updateUserOrderHistory.save()
            const userCart = await Cart.findOneAndUpdate(
                { userId: looginedInUser },
                { $pull: { orders: { productID: new mongoose.Types.ObjectId(Product) } } }
            )
            if (!userCart) {
                throw new ApiError(404, "No cart found for the user")
            }
            console.log("User Cart is: ", userCart)
        }
    }
    const getNewCartDetails = await Cart.findById(looginedInUser)
    if (getNewCartDetails) {
        throw new ApiError(500, "All product removal couldn't complete")
    }
    return res.status(200)
        .json(new ApiResponse(200, {}, "All cart orders Placed"))

})

export { getCartDetails, addToCart, removeCart, cartOrderCompletion }