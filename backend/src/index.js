import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js"
dotenv.config({
    path: "./.env"
})

connectDB()
    .then(() => {
        app.get("/", (req, res) => {
            res.send("API is running...");
        });

        app.listen(process.env.port || 9000, () => {
            console.log(`Server is running at port ${process.env.port}`)
        })
    })
    .catch((err) => {
        console.log("Mongo db connection failed !!", err)
    })