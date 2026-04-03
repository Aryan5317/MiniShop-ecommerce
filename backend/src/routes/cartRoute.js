import { Router } from "express";
import { getCartDetails, addToCart, removeCart, cartOrderCompletion } from "../controllers/cartController.js"
import { VerifyJWT } from "../middlewares/authMiddleware.js";

const cartRouter = Router()

cartRouter.route("/cart-product").get(VerifyJWT, getCartDetails)
cartRouter.route("/addToCart").patch(VerifyJWT, addToCart)
cartRouter.route("/remove-cartPorduct").patch(VerifyJWT, removeCart)
cartRouter.route("/cart-completed").patch(VerifyJWT, cartOrderCompletion)
export default cartRouter