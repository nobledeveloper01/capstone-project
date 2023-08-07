const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const app = express();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid"); // Import the uuid package
const router = express.Router();
const port = 5000;
const secretKey = "567y8tu7777"; // Change this to a secure secret key
const saltRounds = 10; // You can adjust the number of salt rounds as per your requirement
const User = require("./models/validate");
const Product = require("./models/product");
const Image = require("./models/image"); // Import your Mongoose model
const usersRoute = require("./routes/users");
const axios = require('axios'); 


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const upload = multer({ dest: 'uploads/', name: 'image'});

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }

  const file = req.file;
  res.status(200).json({ message: 'File uploaded successfully', filename: file.filename });
});

app.get('/files', (req, res) => {
  // Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
});



app.use("/api/users", usersRoute);

const users = User;



// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://godspraise01:9AUQtSlrAIAKDmZc@cluster0.bgrwzjf.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/api/register", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    otherName,
    dob,
    gender,
    nationality,
    selectedState,
    selectedLga,
    address,
    areaCode,
    phoneNumber,
    farmingType,
    identificationType,
    userCategory,
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Generate a unique ID using uuid
    const userId = uuid.v4(); // Generates a version 4 (random) UUID

    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const customUserId = userId;

    // Create a new user with the generated ID
    const newUser = await User.create({
      _id: customUserId,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      otherName,
      dob,
      gender,
      nationality,
      selectedState,
      selectedLga,
      address,
      areaCode,
      phoneNumber,
      farmingType,
      identificationType,
      userCategory,
    });

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = { userId: User._id, email: User.email };

    // Create and sign the JWT
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    // Send the JWT in the response
    res.json({ token });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during signin:", error);
    //res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { product, selectedCategory, selectedSubcategory, price, description, sellerContact, address, selectedState, selectedLga, tags } = req.body;
    const newProduct = new Product({ product, selectedCategory, selectedSubcategory, price, description, sellerContact, address, selectedState, selectedLga, tags });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Sample route for testing
app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
