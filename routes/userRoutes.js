const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { auth } = require("../middleware/auth.js");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/users/login
// @desc    Auth user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/me
// @desc    Get logged in user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/users/cart
// @desc    Add to cart
// @access  Private
router.post("/cart", auth, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);
    await user.addToCart(productId, quantity);
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/users/cart/:productId
// @desc    Remove from cart
// @access  Private
router.delete("/cart/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await user.removeFromCart(req.params.productId);
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/cart
// @desc    Get user cart
// @access  Private
router.get("/cart", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "cart.items.productId"
    );
    res.json(user.cart.items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
