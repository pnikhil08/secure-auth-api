// // we use this file for connect database 
// import mongoose from "mongoose";
// import config from "./config.js";
// async function connectDB() {
    
//     await mongoose.connect(config.MONGO_URI)

//     console.log("Connectedd to DB")
// }

// export default connectDB;


// Database connection configuration
// Database connection configuration

import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;