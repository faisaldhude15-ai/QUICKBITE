const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




// =====================================
// Register User
// POST /api/auth/register
// =====================================

const register = async (req, res) => {

  try {


    const {
      name,
      email,
      password,
      phone,
      address
    } = req.body;




    if (!name || !email || !password) {


      return res.status(400).json({

        success:false,

        message:"Name, Email and Password are required"

      });


    }





    const checkEmail =
      email.toLowerCase().trim();





    const existingUser =
      await User.findOne({

        email:checkEmail

      });





    if(existingUser){


      return res.status(400).json({

        success:false,

        message:"User already exists"

      });


    }







    const hashedPassword =
      await bcrypt.hash(

        password,

        10

      );








    const user =
      await User.create({

        name,

        email:checkEmail,

        password:hashedPassword,

        phone,

        address

      });







    const userData =
      user.toObject();



    delete userData.password;







    res.status(201).json({

      success:true,

      message:"User registered successfully",

      user:userData

    });







  }
  catch(error){


    console.log(
      "Register Error:",
      error
    );



    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};









// =====================================
// Login User
// POST /api/auth/login
// =====================================

const login = async(req,res)=>{


  try{


    const {

      email,

      password

    } = req.body;





    if(!email || !password){


      return res.status(400).json({

        success:false,

        message:"Email and Password are required"

      });


    }







    const checkEmail =
      email.toLowerCase().trim();






    const user =
      await User.findOne({

        email:checkEmail

      });






    if(!user){


      return res.status(401).json({

        success:false,

        message:"Invalid email or password"

      });


    }








    const passwordMatch =
      await bcrypt.compare(

        password,

        user.password

      );







    if(!passwordMatch){


      return res.status(401).json({

        success:false,

        message:"Invalid email or password"

      });


    }









    const token =
      jwt.sign(

        {

          id:user._id,

          role:user.role

        },


        process.env.JWT_SECRET,


        {

          expiresIn:"7d"

        }


      );








    const userData =
      user.toObject();



    delete userData.password;







    res.status(200).json({

      success:true,

      message:"Login successful",

      token,

      user:userData

    });






  }
  catch(error){


    console.log(
      "Login Error:",
      error
    );



    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};









module.exports = {

  register,

  login

};