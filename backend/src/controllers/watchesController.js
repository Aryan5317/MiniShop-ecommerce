import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandler.js";
import { Watches } from "../models/watchesModal.js";

const getWatchDetails = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id
    console.log("Login user id: ", looginedInUser)
    if (!looginedInUser) {
        throw new ApiError(500, "Unable to get the userId")
    }

    const fetchWatchesData = await Watches.find({})
    console.log("Watches details is: ", fetchWatchesData)

    return res.status(200)
        .json(new ApiResponse(
            200, {
            productData: fetchWatchesData
        }, "Watches data fetched"
        ))
})

export {getWatchDetails}  