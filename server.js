
// Import the Express application instance
import app from "./src/app.js";

// Import the function responsible for establishing the database connection
import connectDB from "./src/config/database.js";

// Define the port on which the server will run
const PORT = 3000;

// Start the application server
const startServer = async () => {
    try {
        // Establish a connection with the database
        // The server will start only after the database connection is successful
        await connectDB();

        // Start listening for incoming HTTP requests
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (error) {
        // Handle any error that occurs during database connection or server startup
        console.error("❌ Failed to start server:", error.message);

        // Exit the process with a failure status code
        process.exit(1);
    }
};

// Execute the server startup function
startServer();

