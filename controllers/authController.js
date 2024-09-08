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
    console.log("hek")
    let { id, password, type } = req.body;   
    console.log(id, password, type)
    let user = type='admin' ? await User.findOne({email: id}) : await User.findOne({employeeId:id  });
    console.log(user)
    if (!user) {
      console.log("User not found with id:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let isPasswordMatch = await bcrypt.compare(password, user.password);
 

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let token = jwt.sign(
      { userId: user._id, accountType: user.accountType },
      JWT_SECRET
    );
    return res.status(200).json({ type: user.accountType, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// Get user details by ID

