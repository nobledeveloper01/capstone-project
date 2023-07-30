const mongoose = require('mongoose');

const uri = 'mongodb+srv://godspraise01:9AUQtSlrAIAKDmZc@cluster0.bgrwzjf.mongodb.net/?retryWrites=true&w=majority'; // Replace 'my_database' with your actual database name
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

module.exports = db;