import express from "express";

import Product from "./models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

// [9] Get all products
app.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});

// [3] Define routes that handle HTTP GET/POST requests for the root URL
// Using POST when create products
app.post("/", async (req, res) => {
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
app.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});

// [10] Update a product
app.put("/:id", async (req, res) => {
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

export default router;
