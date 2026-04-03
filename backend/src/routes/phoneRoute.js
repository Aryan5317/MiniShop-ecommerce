import { Router } from "express";
import {getMobileDetails} from "../controllers/phoneController.js"
import { VerifyJWT } from "../middlewares/authMiddleware.js";

const phoneRouter = Router();

phoneRouter.route("/phone-Details").get(VerifyJWT, getMobileDetails)
export default phoneRouter