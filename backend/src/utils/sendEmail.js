import nodemailer from "nodemailer"
import ApiError from "./errorHandler.js"

export const sendEmail = async (options) => {
    if(!options || !options.to){
        throw new ApiError("SendEmail utility: Recipient email is missing.")
    }
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        })

        await transporter.sendMail({
            from: `"MiniShop"<${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
        })
        console.log("Mail send successfully")
        return {success: true, message: "Email Sent"}
    }
    catch(err){
        console.log("Error is: ", err)
        throw err
    }
}