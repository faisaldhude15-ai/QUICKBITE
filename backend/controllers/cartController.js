const Cart = require("../models/Cart");
const Food = require("../models/Food");



// =====================================
// Add To Cart
// POST /api/cart/add
// =====================================

const addToCart = async (req, res) => {

  try {


    const { foodId } = req.body;



    if (!foodId) {

      return res.status(400).json({

        success: false,

        message: "Food ID required"

      });

    }



    const food = await Food.findById(foodId);



    if (!food) {

      return res.status(404).json({

        success: false,

        message: "Food not found"

      });

    }





    let cartItem = await Cart.findOne({

      user: req.user._id,

      food: foodId

    });





    // Already Exists

    if (cartItem) {


      cartItem.quantity += 1;


      cartItem.totalPrice =
        cartItem.price * cartItem.quantity;



      await cartItem.save();



      return res.json({

        success: true,

        message: "Cart quantity updated",

        cart: cartItem

      });

    }






    // Create New Cart Item

    cartItem = new Cart({

      user: req.user._id,

      food: food._id,

      name: food.name,

      image: food.image,

      price: food.price,

      quantity: 1,

      totalPrice: food.price

    });




    await cartItem.save();





    res.status(201).json({

      success: true,

      message: "Food added to cart",

      cart: cartItem

    });





  } catch (error) {


    console.log("Add Cart Error:", error);


    res.status(500).json({

      success: false,

      message: error.message

    });


  }

};








// =====================================
// Get Cart
// GET /api/cart
// =====================================

const getCart = async (req, res) => {


  try {


    const cart = await Cart.find({

      user: req.user._id

    }).populate("food");




    res.json({

      success: true,

      cart

    });



  } catch(error) {


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};








// =====================================
// Remove Cart Item
// DELETE /api/cart/:id
// =====================================

const removeCart = async(req,res)=>{


  try {


    const item = await Cart.findOne({

      _id:req.params.id,

      user:req.user._id

    });





    if(!item){


      return res.status(404).json({

        success:false,

        message:"Cart item not found"

      });


    }





    await item.deleteOne();





    res.json({

      success:true,

      message:"Item removed"

    });





  } catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};






module.exports = {

  addToCart,

  getCart,

  removeCart

};