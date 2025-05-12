const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const PaymentModel = require("../Models/Payment");
const userdetails = require("../Models/donation");

const instance = new Razorpay({
  key_id: "rzp_test_4dGSN3soiQbdOv",
  key_secret: "wfGM2AxXvRPUnrdEsVA62WyP",
});

// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: "donation_rcpt_" + Date.now(),
    };
    const order = await instance.orders.create(options);
    console.log("Razorpay order response:", order);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, error });
  }
};
// Payment Verification
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_SECRET || "wfGM2AxXvRPUnrdEsVA62WyP"
    )
    .update(sign)
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    try {
      // 1. Save payment details
      const payment = await PaymentModel.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        currency: "INR",
        paymentStatus: "Success",
      });

      
      const updated = await userdetails.findOneAndUpdate(
        { donation: { $exists: false } }, 
        { $set: { donation: payment._id } },
        { sort: { createdAt: -1 }, new: true }
      );

      res.status(200).json({
        success: true,
        message: "Payment verified and saved successfully!",
        updated,
      });
    } catch (err) {
      console.error("DB Save Error:", err.message);
      res.status(500).json({
        success: false,
        message: "Payment verified but DB save failed.",
        error: err.message,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed. Signature mismatch!",
    });
  }
};
