const LoginSchema = require("../Models/RegisterLoginSchema");

const LoginRoutes = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await LoginSchema.findOne({ Email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const u_type = user.usertype;
    if (Password === user.Password) {
      console.log("User login successfully", u_type);
      return res.status(200).json({ message: "User login successfully" });
    } else {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = LoginRoutes;
