const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    otherName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    selectedState: { type: String, required: true },
    selectedLga: { type: String, required: true },
    address: { type: String, required: true },
    areaCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    farmingType: { type: String, required: true },
    identificationType: { type: String, required: true },
    userCategory: { type: String, required: true }
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;