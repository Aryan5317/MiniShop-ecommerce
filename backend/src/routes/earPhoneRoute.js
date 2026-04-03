import { Router } from "express";
import { VerifyJWT } from "../middlewares/authMiddleware.js";
import { getEarPhonesDetails } from "../controllers/earPhonesController.js";
const earPhonesRouter = Router()

earPhonesRouter.route("/earPhones-Details").get(VerifyJWT, getEarPhonesDetails)

export default earPhonesRouter