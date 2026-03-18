import { generateAccessToken } from "../../utils/token.js";

export const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    const token = generateAccessToken(user);

    res.status(200).json({
      message: "Authentication successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.message
    });
  }
};