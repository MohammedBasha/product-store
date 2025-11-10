import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // make sure to add the .js extension
import Product from "./models/product.model.js";

// [5] Configure dotenv to load environment variables from a .env file
dotenv.config();

// [1] use the express factory function
const app = express();

// [3] Define routes that handle HTTP GET/POST requests for the root URL
// Using POST when create products
app.post("/product", async (req, res) => {
    const product = await req.body; // get the product data from the request body

    if (!product.name || !product.price || !product.image) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

    // [4] Send various types of HTTP responses to the client
    res.send("Server is running");
});

// [2] Start a web server and configure it to listen for incoming HTTP requests on the port 5000
app.listen(5000, () => {
    // [6] Connect to MongoDB
    connectDB();

    console.log("server started at http://localhost:5000");
});
