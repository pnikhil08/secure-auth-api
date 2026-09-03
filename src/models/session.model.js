import mongoose from "mongoose";

// Schema for storing user login sessions
const sessionSchema = new mongoose.Schema(
    {
        // Reference to the user who owns this session
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "User is required"],
        },

        // Hashed refresh token used to identify the session securely
        refreshTokenHash: {
            type: String,
            required: [true, "Refresh Token required"],
        },

        // IP address from which the session was created
        ip: {
            type: String,
            required: [true, "IP address is required"],
        },

        // Browser/client information used to identify the device
        userAgent: {
            type: String,
            required: [true, "User agent is required"],
        },

        // Indicates whether the session has been invalidated
        revoked: {
            type: Boolean,
            default: false,
        },
    },
    {
        // Automatically adds createdAt and updatedAt fields
        timestamps: true,
    }
);

// Create and export the Session model
const sessionModel = mongoose.model("sessions", sessionSchema);

export default sessionModel;