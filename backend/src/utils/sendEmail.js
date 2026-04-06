import nodemailer from "nodemailer";
import ApiError from "./errorHandler.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    family: 4, // 🔥 FORCE IPv4 (THIS FIXES YOUR ERROR)
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
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