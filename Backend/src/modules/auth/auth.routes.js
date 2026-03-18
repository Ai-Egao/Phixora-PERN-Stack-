import express from "express";
import passport from "../../config/passport.js";
import { generateAccessToken } from "../../utils/token.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateAccessToken(req.user);

    res.json({
      message: "Authentication successful",
      token,
      user: req.user
    });
  }
);

export default router;