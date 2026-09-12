import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: config.GOOGLE_USER,
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        refreshToken: config.GOOGLE_REFRESH_TOKEN,
    },
});

// Verify email server connection
transporter.verify((error) => {
    if (error) {
        console.error("Error connecting to email server:", error);
        return;
    }

    console.log("Email server is ready to send messages");
});

// Send email
export const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Your Name" <${config.GOOGLE_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent:", info.messageId);

        const previewUrl = nodemailer.getTestMessageUrl(info);

        if (previewUrl) {
            console.log("Preview URL:", previewUrl);
        }

        return info;
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
