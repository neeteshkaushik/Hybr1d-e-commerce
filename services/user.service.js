const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(username, password, type) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash, type });
    await user.save();
    console.log(`User ${username} registered successfully`);
  } catch (error) {
    console.error(`ERROR: userService -> Registration failed: ${error}`);
    throw error;
  }
}

async function loginUser(username, password) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    console.log(`User ${username} logged in successfully`);
    const token = jwt.sign(
      { username: user.username, type: user.type, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    console.error(`ERROR: userService -> Login failed: ${error}`);
    throw error;
  }
}

async function getUsersByQuery(query) {
  try {
    const users = await User.find(query, { password: 0 });
    return users;
  } catch (error) {
    console.error(`ERROR: userService -> getUsersByQuery failed: ${error}`);
    throw error;
  }
}

module.exports = { registerUser, loginUser, getUsersByQuery };
