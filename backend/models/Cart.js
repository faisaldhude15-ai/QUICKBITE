const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema(

  {

    user: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true

    },


    food: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Food",

      required: true

    },


    name: {

      type: String,

      required: true

    },


    image: {

      type: String,

      default: ""

    },


    price: {

      type: Number,

      required: true

    },


    quantity: {

      type: Number,

      default: 1,

      min: 1

    },


    totalPrice: {

      type: Number,

      default: 0

    }

  },


  {

    timestamps: true

  }

);



module.exports = mongoose.model(
  "Cart",
  cartSchema
);