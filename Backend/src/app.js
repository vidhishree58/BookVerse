const express = require("express");
const cors = require("cors");
const authRoutes = require("../routes/authRoutes");
const bookRoutes = require("../routes/bookRoutes");
const reviewRoutes = require("../routes/reviewRoutes");
const userRoutes = require("../routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Signup API and LOGIN API 
app.use("/api/auth", authRoutes);

//BOOK API
app.use("/api/books", bookRoutes);

//REVIEW API
app.use("/api/reviews", reviewRoutes);

//USER PROFILE API
app.use("/api/users", userRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Novel API is Running");
});

module.exports = app;