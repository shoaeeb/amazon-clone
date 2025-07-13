const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/products
// @desc    Create a product
// @access  Private/Admin
router.post("/", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      user: req.user.id,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      numReviews: req.body.numReviews,
      description: req.body.description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.image = req.body.image || product.image;
      product.brand = req.body.brand || product.brand;
      product.category = req.body.category || product.category;
      product.countInStock = req.body.countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    await product.remove();
    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
