import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoute.js"
import phoneRouter from "./routes/phoneRoute.js"
import orderRoute from "./routes/orderRoute.js"
import cartRouter from "./routes/cartRoute.js"
import bagsRouter from "./routes/bagsRoute.js"
import watchRouter from "./routes/watchRoute.js"
import clothesRouter from "./routes/clothesRoute.js"
import earPhonesRouter from "./routes/earPhoneRoute.js"
import shoesRouter from "./routes/shoesRoute.js"

const app = express()
app.use(cors({
    origin: "https://mini-shop-ecommerce-six.vercel.app",
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
app.use("/api/users/orderDetails", orderRoute)
app.use("/api/users/cartDetails", cartRouter)
app.use("/api/users/bagsDetails", bagsRouter)
app.use("/api/users/watchDetails", watchRouter)
app.use("/api/users/clothesDetails", clothesRouter)
app.use("/api/users/earPhoneDetails", earPhonesRouter)
app.use("/api/users/shoesDetails", shoesRouter)


app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.statusCode || 500)
        .json({
            success: false,
            message: err.message || "Internal Server Error"
        })
})

export { app }