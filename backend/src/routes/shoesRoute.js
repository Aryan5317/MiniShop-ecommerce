import { Router } from "express";
import {getShoesDetails} from "../controllers/shoesController.js"
import { VerifyJWT } from "../middlewares/authMiddleware.js";
const shoesRouter = Router()

shoesRouter.route("/shoes-Details").get(VerifyJWT, getShoesDetails)

export default shoesRouter