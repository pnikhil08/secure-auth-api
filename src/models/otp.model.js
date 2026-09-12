import mongoose from "mongoose";

// OTP schema for storing hashed OTPs associated with a user
const otpSchema = new mongoose.Schema(
    {
        // Email address associated with the OTP
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
        },

        // Reference to the user who requested the OTP
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "User is required"],
        },

        // Hashed OTP for secure verification
        otpHash: {
            type: String,
            required: [true, "OTP hash is required"],
        },
    },
    {
        // Automatically adds createdAt and updatedAt fields
        timestamps: true,
    }
);

// Create and export the OTP model
const otpModel = mongoose.model("otps", otpSchema);

export default otpModel;
