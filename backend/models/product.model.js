import mongoose from "mongoose";

// Define the structure and properties of documents within a MongoDB collection
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Please enter product price"],
            maxLength: [8, "Price cannot exceed 8 characters"],
        },
        image: {
            type: String,
            required: [true, "Please enter product image"],
            default: 0,
        },
    },
    {
        timestamps: true, // Add createdAt and updatedAt fields
    }
);

// Define and create models. A Mongoose model serves as a wrapper around a Mongoose schema and provides the primary interface for interacting with a MongoDB collection
const Product = mongoose.model("Product", productSchema);

export default Product;
