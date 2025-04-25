const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const PaymentModel = require("../Models/Payment");

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
      amount: req.body.amount, // convert to paisa
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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", "wfGM2AxXvRPUnrdEsVA62WyP")
    .update(sign.toString())
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    try {
      await PaymentModel.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: 50000, // ya tum frontend se bhejna chaaho to
        currency: "INR",
        paymentStatus: "Success",
      });

      res
        .status(200)
        .json({ success: true, message: "Payment verified and saved." });
    } catch (err) {
      console.error("DB Save Error:", err);
      res.status(500).json({
        success: false,
        message: "Payment verified but DB save failed.",
      });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
};
