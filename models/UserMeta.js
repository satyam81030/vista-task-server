const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userMetaSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
 
  // Personal Details
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String },
  contactNumber: { type: String, required: true },
  alternateNumber: { type: String },
  emergencyNumber: { type: String },
  emailId: { type: String, required: true },
  relativeName: { type: String },
  relativeRelation: { type: String },
  relativeNumber: { type: String },

  // Current Working Information
  companyName: { type: String },
  companyAddress: { type: String },
  companyContactNumber: { type: String },
  contactPersonName: { type: String },

  // Insurance Information
  insuranceStatus: {
    type: String,
    enum: ["new customer", "existing customer"],
    required: true,
  },
  insurancePrice: { type: Number, required: true },

  // Agent Information
  agentName: { type: String },
  agentEmployeeId: { type: String },

  // Verification Information
  verifyExecutive: { type: String },
  verifyName: { type: String },
  verifyEmployeeId: { type: String },
  verifyNumber: { type: String },
  finalStatus: {
    type: String,
    enum: ["Verification complete", "Incomplete verification", "File rejected"],
    required: true,
  },

  // Additional Remark
  remark: { type: String },
});


module.exports = mongoose.model("UserMeta", userMetaSchema);
