import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js"; // make sure to add the .js extension
import ProductRoutes from "./routes/product.route.js";

// [5] Configure dotenv to load environment variables from a .env file
dotenv.config();

const __dirname = path.resolve();

// [1] use the express factory function
const app = express();
const PORT = process.env.PORT || 5000;

// [7] Middleware to parse incoming JSON data in the request body
app.use(express.json());

// [12] Use the Product router
app.use("/api/products", ProductRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// [2] Start a web server and configure it to listen for incoming HTTP requests
app.listen(PORT, () => {
    // [6] Connect to MongoDB
    connectDB();
});
