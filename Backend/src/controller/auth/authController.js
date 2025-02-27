import { User } from "../../models/index.js";
import { generateToken } from "../../security/jwt-util.js";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate token and respond
    const token = generateToken({ user: user.toJSON() });
    return res.status(200).json({
      data: { access_token: token },
      message: "Successfully logged in",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Failed to login" });
  }
};


const getMe = async (req, res) => {
  try {
    // req.user is set by authenticateToken middleware.
    const user = req.user
    console.log(user)
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    // Remove sensitive data
    delete user.password;

    res.status(200).send({
      data: user,
      message: "Successfully fetched current user",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch current user" });
  }
};

export const authController = {
  login,
  getMe,
};
