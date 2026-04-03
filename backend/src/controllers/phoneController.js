import { Phones } from "../models/phoneModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Orders } from "../models/userOrderModal.js"
import { Cart } from "../models/cartModal.js";
import ApiError from "../utils/errorHandler.js";

const getMobileDetails = asyncHandler(async (req, res, next) => {
    const looginedInUser = req.verifyUser._id
    console.log("Login user id: ", looginedInUser)
    if (!looginedInUser) {
        throw new ApiError(500, "Unable to get the userId")
    }

    const fetchPhoneData = await Phones.find({})
    console.log("Phone details is: ", fetchPhoneData)

    return res.status(200)
        .json(new ApiResponse(
            200, {
            productData: fetchPhoneData
        }, "User data fetched"
        ))
})


export { getMobileDetails }