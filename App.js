const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Config/db");
const donatingRoute = require("./controllers/donationsController");
const { createOrder, verifyPayment } = require("./controllers/RazorController");
const RegisterRoutes = require("./controllers/RegisterController");
const LoginRoutes = require("./controllers/LoginController");
const {
  getalldonationhistory,
} = require("./controllers/donationHistoryController.js");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.post("/api/donations", donatingRoute);
app.post("/api/razorpay/create-order", createOrder);
app.post("/api/razorpay/verify-payment", verifyPayment);
app.post("/api/register", RegisterRoutes);
app.post("/api/login", LoginRoutes);
app.get("/api/razorpay/donation-history", getalldonationhistory);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
