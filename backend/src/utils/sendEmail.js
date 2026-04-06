// import nodemailer from "nodemailer";
// import ApiError from "./errorHandler.js";

// const transporter = nodemailer.createTransport({
//     host: "74.125.24.108",
//     port: 587,
//     secure: false, // TLS
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
//     connectionTimeout: 10000,
//     greetingTimeout: 10000,
//     socketTimeout: 10000,
//     tls: {
//         rejectUnauthorized: false
//     }
// });
// export const sendEmail = async (options) => {
//     if (!options || !options.to) {
//         throw new ApiError(400, "Recipient email is missing");
//     }
//     try {
//         const info = await transporter.sendMail({
//             from: `"MiniShop" <${process.env.EMAIL_USER}>`,
//             to: options.to,
//             subject: options.subject || "MiniShop Notification",
//             text: options.text || "",
//             html: options.html || null
//         });
//         console.log("✅ Email sent:", info.messageId);
//         return {
//             success: true,
//             message: "Email Sent"
//         };
//     } catch (err) {
//         console.log("❌ Email error:", err.message);
//         throw new ApiError(500, "Failed to send email");
//     }
// };

import { Resend } from "resend";
import ApiError from "./errorHandler.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (options) => {
    if (!options || !options.to) {
        throw new ApiError(400, "Recipient email is missing");
    }
    try {
        const { data, error } = await resend.emails.send({
            from: "MiniShop <onboarding@resend.dev>",
            to: options.to,
            subject: options.subject || "MiniShop Notification",
            text: options.text || "",
            html: options.html || null
        });

        if (error) {
            console.log("❌ Email error:", error.message);
            throw new ApiError(500, "Failed to send email");
        }

        console.log("✅ Email sent:", data.id);
        return {
            success: true,
            message: "Email Sent"
        };
    } catch (err) {
        console.log("❌ Email error:", err.message);
        throw new ApiError(500, "Failed to send email");
    }
};