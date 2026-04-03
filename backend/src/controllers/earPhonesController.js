import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandler.js";
import { Earphones } from "../models/earPhonesModal.js";

const getEarPhonesDetails = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id
    console.log("Login user id: ", looginedInUser)
    if (!looginedInUser) {
        throw new ApiError(500, "Unable to get the userId")
    }

    const fetchEarPhonessData = await Earphones.find({})
    console.log("EarPhones details is: ", fetchEarPhonessData)

    return res.status(200)
        .json(new ApiResponse(
            200, {
            productData: fetchEarPhonessData
        }, "Bags data fetched"
        ))
})

export {getEarPhonesDetails}