import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // make sure to add the .js extension
import Product from "./models/product.model.js";
import mongoose, { mongo } from "mongoose";

// [5] Configure dotenv to load environment variables from a .env file
dotenv.config();

// [1] use the express factory function
const app = express();

// [7] Middleware to parse incoming JSON data in the request body
app.use(express.json());

// [3] Define routes that handle HTTP GET/POST requests for the root URL
// Using POST when create products
app.post("/api/products", async (req, res) => {
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
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }

    // [4] Send various types of HTTP responses to the client
    res.send("Server is running");
});

// [8] Delete a product
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});

// [9] Get all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});

// [10] Update a product
app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await req.body;

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true,
        });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});

// [11] Get a single product
app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});

// [2] Start a web server and configure it to listen for incoming HTTP requests on the port 5000
app.listen(5000, () => {
    // [6] Connect to MongoDB
    connectDB();

    console.log("server started at http://localhost:5000");
});
