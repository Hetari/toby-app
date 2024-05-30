import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/redirect',
    },
    () => {
      // Callback function for the GoogleStrategy
    }
  )
);

export default passport;
