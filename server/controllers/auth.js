const register = async (req, res) => {
  // TODO: add normal register logic here
  return res.send('Register controller');
};
const login = async (req, res) => {
  // TODO: add normal register logic here
  return res.send('Login controller');
};

const googleAuth = async (req, res) => {
  return res.send('Logging with Google');
};

const logout = async (req, res) => {
  return res.send('Logout...');
};

export { register, login, googleAuth, logout };
