import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoute.js"
import phoneRouter from "./routes/phoneRoute.js"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

app.use("/api/users", userRouter)
app.use("/api/users/phoneDetails", phoneRouter)

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.statusCode || 500)
    .json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

export {app}