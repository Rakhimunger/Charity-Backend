const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Config/db");
const donatingRoute = require("./controllers/donationsController");
const { createOrder, verifyPayment } = require("./controllers/RazorController");
const RegisterRoutes = require("./controllers/RegisterController");
const LoginRoutes = require("./controllers/LoginController");

// Initialize express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON body

// Connect to MongoDB
connectDB();

// Routes
app.post("/api/donations", donatingRoute); // Donation API route
app.post("/api/razorpay/create-order", createOrder);
app.post("/api/razorpay/verify-payment", verifyPayment);
app.post("/api/register", RegisterRoutes);
app.post("/api/login", LoginRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
