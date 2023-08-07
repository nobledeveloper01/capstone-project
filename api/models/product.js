const mongoose = require('mongoose');

// Define the Product Upload schema
const productSchema = new mongoose.Schema({
  product: String,
  selectedCategory: String,
  selectedSubcategory: String,
  price: String,
  description: String,
  sellerContact: String,
  address: String,
  selectedState: String,
  selectedLga: String,
  tags: String,
});

const Product = mongoose.model('Product', productSchema);