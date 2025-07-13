const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Clear existing products
    await Product.deleteMany();
    console.log("Previous products removed");

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products inserted`);

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
