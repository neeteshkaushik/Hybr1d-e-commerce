const express = require("express");
const { registerUser, loginUser } = require("../services/user.service");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    await registerUser(req.body.username, req.body.password, req.body.type);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(`ERROR: Registration failed: ${error}`);
    if (error.code === 11000) res.status(400).send("Username already exists");
    else res.status(500).json({ message: "Registration failed" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.username, req.body.password);
    res.json({ token });
  } catch (error) {
    console.error(`ERROR: Login failed: ${error}`);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
