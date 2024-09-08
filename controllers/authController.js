const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { id, password, type } = req.body;

    // Get current server time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Define allowed login hours
    const startHour = 9;
    const startMinute = 0;
    const endHour = 23;
    const endMinute = 59;

    // Check if current time is within the allowed login hours
    if (
     type==='user' && (currentHour < startHour || (currentHour === startHour && currentMinute < startMinute)) ||
      (currentHour > endHour || (currentHour === endHour && currentMinute > endMinute))
    ) {
      return res.status(403).json({ message: "Login is only allowed between 9:00 AM and 6:45 PM" });
    }

    // Check if the user exists
    let user = await User.findOne({ employeeId: id });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password matches
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    let token = jwt.sign(
      { userId: user._id, accountType: user.accountType },
      JWT_SECRET
    );

    // Respond with token and user account type
    return res.status(200).json({ type: user.accountType, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


