import nodemailer from "nodemailer";
import ApiError from "./errorHandler.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 5000,  
    greetingTimeout: 5000,
    socketTimeout: 5000
});
export const sendEmail = async (options) => {
    if (!options || !options.to) {
        throw new ApiError(400, "Recipient email is missing");
    }
    try {
        const info = await transporter.sendMail({
            from: `"MiniShop" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject || "MiniShop Notification",
            text: options.text || "",
            html: options.html || null 
        });
        console.log("✅ Email sent:", info.messageId);
        return {
            success: true,
            message: "Email Sent"
        };
    } catch (err) {
        console.log("❌ Email error:", err.message);
        throw new ApiError(500, "Failed to send email");
    }
};