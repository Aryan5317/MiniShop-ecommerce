import { Clothes } from "../models/clothesModal.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandler.js";

const getClothesDetails = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id
    console.log("Login user id in clothes: ", looginedInUser)
    if (!looginedInUser) {
        throw new ApiError(500, "Unable to get the userId")
    }

    const fetchClothesData = await Clothes.find({})
    console.log("Clothes details is: ", fetchClothesData)

    return res.status(200)
        .json(new ApiResponse(
            200, {
            productData: fetchClothesData
        }, "Clothes data fetched"
        ))
})

export {getClothesDetails}