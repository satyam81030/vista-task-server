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

    // Get the current time in GMT
    let currentTime = new Date();

    // Adjust to IST (GMT + 5:30)
    let istTime = new Date(currentTime.getTime() + (5.5 * 60 * 60 * 1000));
    let currentHour = istTime.getHours();

    // Check if current time is between 9 AM (9) and 5 PM (17) IST
    if ((currentHour >= 9 && currentHour < 17) || type === 'admin') {
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
    } else {
      res.status(403).json({ message: 'Access is allowed only between 9 AM and 5 PM IST.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



