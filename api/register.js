const express = require('express');
const router = express.Router();
const User = require('./user');

router.post('/', async (req, res) => {
  const { firstName, lastName, otherName, email, dob, gender, nationality, nationalities, lgas, selectedState, selectedLga, address, areaCode, phoneNumber, farmingType, identificationType, file, userCategory } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user
    const newUser = new User({ firstName, lastName, otherName, email, dob, gender, nationality, nationalities, lgas, selectedState, selectedLga, address, areaCode, phoneNumber, farmingType, identificationType, file, userCategory });
    await newUser.save();

    res.json({ message: 'Registration successful.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user.' });
  }
});

module.exports = router;
