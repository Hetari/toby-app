import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/users.js';

import 'dotenv/config';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/redirect',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // check if user exists
        let user = await User.findOne({
          where: {
            email: profile.emails[0].value,
            //   provider: profile.provider,
            //   providerId: profile.id,
          },
        });

        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            username: profile.displayName,
            provider: profile.provider,
            providerId: profile.id,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user ID into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default passport;
