import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // make sure to add the .js extension
import ProductRoutes from "./routes/product.route.js";

// [5] Configure dotenv to load environment variables from a .env file
dotenv.config();

// [1] use the express factory function
const app = express();

// [7] Middleware to parse incoming JSON data in the request body
app.use(express.json());

// [12] Use the Product router
app.use("/api/products", ProductRoutes);

// [2] Start a web server and configure it to listen for incoming HTTP requests on the port 5000
app.listen(5000, () => {
    // [6] Connect to MongoDB
    connectDB();

    console.log("server started at http://localhost:5000");
});
