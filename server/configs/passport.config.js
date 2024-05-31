import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { User } from '../models/users.js';

// import dotenv from 'dotenv';
// dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user exists
        let user = await User.findOne({
          where: {
            provider: profile.provider,
            providerId: profile.id,
          },
        });

        if (!user) {
          user = await User.create({
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
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
