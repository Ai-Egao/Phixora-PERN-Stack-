import express from "express";
import passport from "../../config/passport.js";
import { googleCallback } from "./auth.controller.js";

const router = express.Router();

// Redirect user to Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google redirects back here after login
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default router;