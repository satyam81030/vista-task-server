const UserMeta = require("../models/UserMeta");
const UsersData = require("../models/UsersData");
// Add or Update UserMetam

const User = require("../models/User");

// Add User
exports.addUser = async (req, res) => {
  try {
    const { employeeId, employeeName, employeeMobileNumber, password } = req.body;

    let user = await User.findOne({ employeeId });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      employeeId,
      employeeName,  
      password,
      employeeMobileNumber,
      accountType: 'User'
    });

    // Save user to database
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {                                               
  try {
    const userId = req.params.id;
    const user = await UserMeta.findById(userId) // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addOrUpdateUserMeta = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      fatherName,
      currentAddress,
      permanentAddress,
      contactNumber,
      alternateNumber,
      emergencyNumber,
      emailId,
      relativeName,
      relativeRelation,
      relativeNumber,
      currentWorkingCompanyName,
      companyAddress,
      companyContactNumber,
      contactPersonName,
      insuranceStatus,
      agentName,
      agentEmployeeId,
      verifyExecutive,
      verifyName,
      verifyEmployeeId,
      verifyNumber,
      finalStatus,
      insurancePrice,
      remark,
    } = req.body;

    // Create a new UserMeta document
    const userMeta = new UserMeta({
      userId: req.user.userId,
      firstName,
      lastName,
      fatherName,
      currentAddress,
      permanentAddress,
      contactNumber,
      alternateNumber,
      emergencyNumber,
      emailId,
      relativeName,
      relativeRelation,
      relativeNumber,
      currentWorkingCompanyName,
      companyAddress,
      companyContactNumber,
      contactPersonName,
      insuranceStatus,
      agentName,
      agentEmployeeId,
      verifyExecutive,
      verifyName,
      verifyEmployeeId,
      verifyNumber,
      finalStatus,
      insurancePrice,
      remark
    });
    await userMeta.save();

    res.status(201).json({ message: "User metadata created successfully", userMeta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addOrUpdateUserMetaById = async (req, res) => {

  try {
    const userId = req.params.id;
    const {
      firstName,
      lastName,
      fatherName,
      currentAddress,
      permanentAddress,
      contactNumber,
      alternateNumber,
      emergencyNumber,
      emailId,
      relativeName,
      relativeRelation,
      relativeNumber,
      companyName,
      companyAddress,
      companyContactNumber,
      contactPersonName,
      insuranceStatus,
      agentName,
      agentEmployeeId,
      verifyExecutive,
      verifyName,
      verifyEmployeeId,
      verifyNumber,
      finalStatus,
      insurancePrice,
      remark,
    } = req.body;

    // Find existing UserMeta document or create a new one
    let userMeta = new UserMeta(
      { userId,
        firstName,
        lastName,
        fatherName,
        currentAddress,
        permanentAddress,
        contactNumber,
        alternateNumber,
        emergencyNumber,
        emailId,
        relativeName,
        relativeRelation,
        relativeNumber,
        companyName,
        companyAddress,
        companyContactNumber,
        contactPersonName,
        insuranceStatus,
        agentName,
        agentEmployeeId,
        verifyExecutive,
        verifyName,
        verifyEmployeeId,
        verifyNumber,
        finalStatus,
        insurancePrice,
        remark,
      }
    );

    await userMeta.save()

    res.status(200).json({ message: "User metadata created successfully", userMeta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addUserMeta = async (req, res) => {
  try {
    const {
      employeeId,
      businessName,
      address,
      city,
      state,
      pinCode,
      whatsappNumber,
      phoneNumber,
      gstNumber,
      yearOfEstablishment,
      rating,
      sourcesLink,
      sourcesPlatform,
      employeeName,
      employeeMobileNumber
    } = req.body;

    if(rating > 5){
     res.status(403).json({ message: 'rating should be between 1 to 5' });
    }
    // Check if user exists
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new UserMeta document
    const userData = new UsersData({
      businessName,
      address,
      city,
      state,
      pinCode,
      whatsappNumber,
      phoneNumber,
      gstNumber,
      yearOfEstablishment,
      rating,
      sourcesLink,
      sourcesPlatform,
      employeeId,
      employeeName,
      employeeMobileNumber,
      userId: req.user.userId,
    });

    // Save the UserMeta document
    await userData.save();

    res.status(201).json({ message: "User metadata created successfully", userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addUserMetaById = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      employeeId,
      businessName,
      address,
      city,
      state,
      pinCode,
      whatsappNumber,
      phoneNumber,
      gstNumber,
      yearOfEstablishment,
      rating,
      sourcesLink,
      sourcesPlatform,
      employeeName,
      employeeMobileNumber
    } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
        if(rating > 5){
         res.status(403).json({ message: 'rating should be between 1 to 5' });
    }

    // Create a new UserMeta document
    const userData = new UsersData({
      businessName,
      address,
      city,
      state,
      pinCode,
      whatsappNumber,
      phoneNumber,
      gstNumber,
      yearOfEstablishment,
      rating,
      sourcesLink,
      sourcesPlatform,
      employeeId,
      employeeName,
      employeeMobileNumber,
      userId
    });

    // Save the UserMeta document
    await userData.save();

    res.status(201).json({ message: "User metadata created successfully", userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Get page and limit from query, or set defaults
    const skip = parseInt(req.query.skip) || 1;
    const take = parseInt(req.query.take) || 10;


    // Get total number of users
    const totalUsers = await User.countDocuments();

    // Get users for the current page
    const users = await User.find()
      .skip(skip) // Skip the previous pages
      .limit(take);    // Limit to the number of users per page


    // Meta information about pagination
    res.status(200).json({count: totalUsers, skip, take, users});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get UserMeta by User ID
exports.getUserMetaByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await UsersData.find({ userId });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
