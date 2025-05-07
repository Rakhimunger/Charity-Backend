const donation = require("../Models/donation");

const registerDonation = async (req, res) => {
  const {
    FullName,
    ContactNumber,
    Email,
    address,
    category,
    Language,
    amount,
  } = req.body;

  if (!amount || amount <= 250) {
    return res.status(400).json({
      error: "Amount should be more than 250.",
    });
  }

  try {
    await donation.create({
      FullName,
      ContactNumber,
      Email,
      address,
      category,
      Language,
      amount,
    });

    res.status(201).json({ message: "Donation submitted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = registerDonation;
