import express from "express";

import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../controllers/product.controller";

const router = express.Router();

// [9] Get all products
router.get("/", getProducts);

// [3] Define routes that handle HTTP GET/POST requests for the root URL
// Using POST when create products
router.post("/", createProduct);

// [8] Delete a product
router.delete("/:id", deleteProduct);

// [10] Update a product
router.put("/:id", updateProduct);

export default router;
