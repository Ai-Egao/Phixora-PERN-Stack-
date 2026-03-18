// for Google OAuth 2.0 authentication
//description: Passport configuration for Google
//  OAuth 2.0 strategy, it checks if the user exists in the 
// database and creates a new user if not.

import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "./database.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        const userQuery = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        let user;

        if (userQuery.rows.length === 0) {
          const newUser = await pool.query(
            `INSERT INTO users (name, email, role)
             VALUES ($1,$2,'customer')
             RETURNING *`,
            [name, email]
          );

          user = newUser.rows[0];
        } else {
          user = userQuery.rows[0];
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;