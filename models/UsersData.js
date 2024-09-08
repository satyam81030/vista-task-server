const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userDataSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: {
        type: String,
        required: true,
      },
    businessName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    whatsappNumber: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    gstNumber: {
        type: String
    },
    yearOfEstablishment: {
        type: Number
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    sourcesLink: {
        type: String
    },
    sourcesPlatform: {
        type: String
    },
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
