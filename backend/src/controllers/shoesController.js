import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandler.js";
import { Shoes } from "../models/shoesModal.js";

const getShoesDetails = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id
    console.log("Login user id: ", looginedInUser)
    if (!looginedInUser) {
        throw new ApiError(500, "Unable to get the userId")
    }

    const fetchShoesData = await Shoes.find({})
    console.log("Shoes details is: ", fetchShoesData)

    return res.status(200)
        .json(new ApiResponse(
            200, {
            productData: fetchShoesData
        }, "Shoes data fetched"
        ))
})

export {getShoesDetails}