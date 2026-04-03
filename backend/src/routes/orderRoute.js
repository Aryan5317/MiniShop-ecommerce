import { Router } from "express";
import { VerifyJWT } from "../middlewares/authMiddleware.js";
import { orderCompletion, getOrder } from "../controllers/orderController.js"
const orderRouter = Router();
orderRouter.route("/order-summary").post(VerifyJWT, orderCompletion)
orderRouter.route("/order-details").get(VerifyJWT, getOrder)

export default orderRouter