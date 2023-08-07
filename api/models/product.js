const mongoose = require('mongoose');

// Define the Product Upload schema
const productSchema = new mongoose.Schema({
  product: String,
  category: String,
  subcategory: String,
  price: String,
  description: String,
  sellerContact: String,
  address: String,
  state: String,
  lga: String,
  tags: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;