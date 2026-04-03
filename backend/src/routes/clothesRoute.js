import { Router } from "express";
import { getClothesDetails } from "../controllers/clothesController.js";
import { VerifyJWT } from "../middlewares/authMiddleware.js";
const clothesRouter = Router()

clothesRouter.route("/clothes-Details").get(VerifyJWT, getClothesDetails)

export default clothesRouter