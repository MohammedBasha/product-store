import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // make sure to add the .js extension

// [5] Configure dotenv to load environment variables from a .env file
dotenv.config();

// [1] use the express factory function
const app = express();

// [3] Define routes that handle HTTP GET request for the root URL
app.get("/", (req, res) => {
    console.log(req);
    console.log(res);
    // [4] Send various types of HTTP responses to the client
    res.send("Server is running");
});

// [2] Start a web server and configure it to listen for incoming HTTP requests on the port 5000
app.listen(5000, () => {
    // [6] Connect to MongoDB
    connectDB();

    console.log("server started at http://localhost:5000");
});
