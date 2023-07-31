const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();
const mongoose = require('mongoose');
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
const users = require('./users');
app.use('/api/users', users);

// Import the 'login' API endpoint
const login = require('./login'); // Adjust the path if necessary
app.use('/api/login', login);

// POST endpoint for user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

// Replace this with actual database validation
const user = users.find((u) => u.email === email && u.password === password);

if (user) {
    // Return success or provide an authentication token for further authorization
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});


// Sample route for testing
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});