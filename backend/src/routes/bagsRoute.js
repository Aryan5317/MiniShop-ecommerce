import { Router } from "express";
import { getMobileDetails } from "../controllers/bagsController.js"
import { VerifyJWT } from "../middlewares/authMiddleware.js";
const bagsRouter = Router()

bagsRouter.route("/bags-Details").get(VerifyJWT, getMobileDetails)

export default bagsRouter