// const paymentModel = require("../Models/donationsSchema");

// const Donation = require("../Models/HistorySchema");

// const createDonation = async (req, res) => {
//   try {
//     const { amount, userId } = req.body;

//     const donation = new Donation({
//       amount,
//       user: userId,
//     });

//     await donation.save();

//     res.status(201).json({ message: "Donation created", donation });
//   } catch (err) {
//     res.status(500).json({ message: "Error", error: err.message });
//   }
// };

// module.exports = { createDonation };
