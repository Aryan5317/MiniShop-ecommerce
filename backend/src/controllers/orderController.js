import { Orders } from "../models/userOrderModal.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/errorHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Phones } from "../models/phoneModal.js"
import { Bags } from "../models/bagsModal.js"
import { Watches } from "../models/watchesModal.js"
import { Clothes } from "../models/clothesModal.js"
import { Earphones } from "../models/earPhonesModal.js"
import { Shoes } from "../models/shoesModal.js"

const orderCompletion = asyncHandler(async (req, res, next) => {
    const loggedInUser = req.verifyUser._id;
    if (!loggedInUser) {
        throw new ApiError(500, "UnAuthorized User");
    }

    const { category, productId, quantity, totalAmount } = req.body;
    console.log("Category is: ", category)
    console.log("Product id: ", productId)
    console.log("Quantity is: ", quantity)
    console.log("Amount total is: ", totalAmount);

    const categoryModelMap = {
        "Phones": Phones,
        "Bags": Bags,
        "Watches": Watches,
        "Clothes": Clothes,
        "Earphones": Earphones,
        "Shoes": Shoes
    }

    const ProductModel = categoryModelMap[category]
    if (!ProductModel) {
        throw new ApiError(400, `Invalid category: ${category}`);
    }

    const findProduct = await ProductModel.findById(productId)
    if (!findProduct) {
        throw new ApiError(500, "No such product exists");
    }

    console.log("Product details: ", findProduct)
    const categoryFieldMap = {
        "Phones": {
            name: findProduct.phoneName,
            images: findProduct.phoneImages,
        },
        "Bags": {
            name: findProduct.bagName,
            images: findProduct.bagImages,
        },
        "Watches": {
            name: findProduct.watchName,
            images: findProduct.watchImages,
        },
        "Clothes": {
            name: findProduct.clothingName,
            images: findProduct.clothingImages,
        },
        "Earphones": {
            name: findProduct.earphonesName,
            images: findProduct.earphonesImages,
        },
        "Shoes": {
            name: findProduct.shoeName,
            images: findProduct.shoeImages,
        }
    }

    const productFields = categoryFieldMap[category];
    if (!productFields) {
        throw new ApiError(400, `No field mapping found for category: ${category}`);
    }
    findProduct.totalSell = findProduct.totalSell + quantity;
    findProduct.stock = findProduct.stock - quantity;
    await findProduct.save();

    const getProductDetails = await ProductModel.findById(productId)
    if (!getProductDetails) {
        throw new ApiError(500, "Product not found after update");
    }
    console.log("Updated Product Details: ", getProductDetails);

    const PurchaseDate = new Date()

    const orderItem = {
        productID: productId,
        category: category,
        name: productFields.name,           
        price: findProduct.currentPrice,
        productImages: productFields.images,  
        discount: findProduct.discount,
        returning: findProduct.returning,
        quantity: quantity,
        totalCost: totalAmount,
        date: PurchaseDate.toLocaleDateString()
    }

    const updateUserOrder = await Orders.findOne({ userId: loggedInUser })

    if (updateUserOrder === null) {
        console.log("Creating new order for user");
        const newOrder = await Orders.create({
            userId: loggedInUser,
            orders: [orderItem]   
        })
        console.log("New Order: ", newOrder);
    } else {
        console.log("Updating existing order for user")
        updateUserOrder.orders.push(orderItem) 
        await updateUserOrder.save();
        console.log("Updated Order: ", updateUserOrder);
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "Order Placed Successfully"))
})

const getOrder = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id;
    if (!looginedInUser) {
        throw new ApiError(500, "UnAuthorized User")
    }
    const getOrderDetails = await Orders.findOne({ userId: looginedInUser })
    if (!getOrderDetails) {
        return res.status(200)
            .json(new ApiResponse(200, { order: { orders: [] } }, "Order Details fetched Successfully"));
    }
    console.log("User Order is: ", getOrderDetails)
    return res.status(200)
        .json(new ApiResponse(200, { order: getOrderDetails }, "Order Details fetched Successfully"));
})

export { orderCompletion, getOrder }