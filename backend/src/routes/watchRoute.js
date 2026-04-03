import { Router } from "express";
import { getWatchDetails } from "../controllers/watchesController.js"
import { VerifyJWT } from "../middlewares/authMiddleware.js";
const watchRouter = Router();
watchRouter.route("/watch-Details").get(VerifyJWT, getWatchDetails)
export default watchRouter
