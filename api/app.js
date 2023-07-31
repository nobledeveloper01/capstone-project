const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Body parser middleware
app.use(express.json());

// Connect to MongoDB
const db = require('./db'); // Assuming db.js is in the same folder as app.js

// Import the 'register' API endpoint
const register = require('./register');
app.use('/api/register', register);

// Import the User Validation API endpoint
const Users = require('./users');
app.use('/api/users', Users);

// User login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const users = await Users.findOne({ email });

    if (!users) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    if (users.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a token and send it to the client upon successful login
    const token = jwt.sign({ userId: users._id }, 'your_secret_key');
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Import the 'login' API endpoint
const login = require('./login'); // Adjust the path if necessary
app.use('/api/login', login);

// Sample route for testing
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});