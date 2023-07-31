const express = require('express');
const router = express.Router();
const Users = require('./validate'); // Assuming you have a User model for MongoDB

// Route to handle user login
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate data here (e.g., check for required fields)

    // Find the user by email in the MongoDB database
    const user = Users.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Check if the password matches the one stored in the database (you should use a secure password hashing mechanism like bcrypt or Argon2 for production)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password.' });
    }

    // If the email and password match, the user is authenticated
    res.json({ success: true, message: 'Login successful!', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Failed to login.' });
  }
});

module.exports = router;
