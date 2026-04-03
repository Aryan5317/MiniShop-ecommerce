import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandler.js";
import { Bags } from "../models/bagsModal.js";


const getMobileDetails = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id
    console.log("Login user id: ", looginedInUser)
    if (!looginedInUser) {
        throw new ApiError(500, "Unable to get the userId")
    }

    const fetchBagsData = await Bags.find({})
    console.log("Bags details is: ", fetchBagsData)

    return res.status(200)
        .json(new ApiResponse(
            200, {
            productData: fetchBagsData
        }, "Bags data fetched"
        ))
})

export {getMobileDetails}