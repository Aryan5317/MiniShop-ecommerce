import mongoose from "mongoose";
import { DB_Name } from "../constant.js"

const connectDB = async () => {
    try {
        const dataBaseConnect = await mongoose.connect(`${process.env.MONOGODB_URL}/${DB_Name}`);
        console.log(`DataBase is connected to ${dataBaseConnect.connection.port}`)
    }
    catch(err){
        console.log("DataBase unable to connect", err)
    }
}

export default connectDB