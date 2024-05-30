import passport from 'passport';

const register = async (req, res) => {
  // TODO: add normal register logic here
  return res.send('Register controller');
};
const login = async (req, res) => {
  // TODO: add normal register logic here
  return res.send('Login controller');
};

const googleAuth = passport.authenticate('google', {
  scope: ['profile'],
});

const googleAuthRedirect = async (req, res) => {
  // TODO: add google auth logic here
  console.log('Google auth controller');
  return res.send('Google auth controller');
};

const logout = async (req, res) => {
  return res.send('Logout...');
};

export { register, login, googleAuth, googleAuthRedirect, logout };
