const express = require('express');
const router = express.Router();
const Users = require('./validate');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user
    const newUser = new Users({ email, password });
    await newUser.save();

    res.json({ message: 'Registration successful.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user.' });
  }
});

module.exports = router;
