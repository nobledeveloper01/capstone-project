const mongoose = require('mongoose');

// Define the Product Upload schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model('Product', productSchema);