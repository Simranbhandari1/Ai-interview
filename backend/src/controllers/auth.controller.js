const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const blacklistTokenModel = require('../models/blacklist.model');
//controller me hum logic likhenge ki jab bhi register route hit hoga to kya hoga
/**
 * @name registerUserController
 * @description Register a new user, expects username , email and password in the request body
 * @access Public
 */

async function registerUserController(req, res) {
  try {
    console.log('req', req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username: username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );
    res.cookie('token', token);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error in registerUserController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * @name loginUserController
 * @description Login an existing user, expects email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;
  console.log('req', req.body);
  const user = await userModel.findOne({ email });
  console.log('user', user);
  if (!user) {
    console.log('User not found with email:', email);
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('isPasswordValid', isPasswordValid);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );
  res.cookie('token', token);
  res.status(200).json({ message: 'User logged in successfully' });
}

//radis isliye use krte kyuki oska throughput oska zyada hota abhi load nhi hai kyuki users  nhi aare so aabhi load nhi so hm vo use krte jiska throughput zyada hota hai jab load aayega tab hm redis use krke dekhenge ki kya performance me farak aata hai ya nhi aur abhi hm mongodb use kr rhe hai kyuki vo easy hai aur hm usme data store kr skte hai aur jab load aayega tab hm redis use krke dekhenge ki kya performance me farak aata hai ya nhi

/**
 * @name logoutUserController
 * @description Logout the current logged in user by clearing the token cookie and adding the token to blacklist
 * @access Public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;
  if (token) {
    await blacklistTokenModel.create({ token });
  }
  res.clearCookie('token');
  res.status(200).json({ message: 'User logged out successfully' });
}
/**
 * @name getMeController
 * @description Get the details of the current logged in user, requires authentication
 * @access Private
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    message: 'User details fetched successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
