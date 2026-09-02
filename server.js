
// import app from "./src/app.js"
// import connectDB from "./src/config/database.js"

// connectDB()
// app.listen(3000, ()=>{
//     console.log("Server is running on port 3000")
// }) 


import app from "./src/app.js";
import connectDB from "./src/config/database.js";

const PORT = 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();