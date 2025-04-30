const donation = require("../Models/donationsSchema");

const registerDonation = async (req, res) => {
  const { fullName, contactNumber, address, reason, amount } = req.body;

  const mobileRegex = /^[0-9]{10}$/;

  if (!mobileRegex.test(contactNumber)) {
    return res.status(400).json({
      error: "Invalid mobile number. It must be exactly 10 digits",
    });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({
      error: "Amount should be more than 250.",
    });
  }

  try {
    await donation.create({
      fullName,
      contactNumber,
      address,
      reason,
      amount,
    });

    res.status(201).json({ message: "Donation submitted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = registerDonation;
