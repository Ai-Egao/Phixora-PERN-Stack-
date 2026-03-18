import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  findUserByEmail,
  createUser
} from "../modules/auth/auth.service.js";

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

        let user = await findUserByEmail(email);

        if (!user) {
          user = await createUser(name, email);
        }

        done(null, user);

      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;