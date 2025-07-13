const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Add to cart method
userSchema.methods.addToCart = function (productId, quantity = 1) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === productId.toString();
  });

  let newQuantity = quantity;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + quantity;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: productId,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;
  return this.save();
};

// Remove from cart method
userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;
  return this.save();
};

// Clear cart method
userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
