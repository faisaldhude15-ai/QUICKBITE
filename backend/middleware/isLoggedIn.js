const jwt = require("jsonwebtoken");
const User = require("../models/User");



const isLoggedIn = async (req, res, next) => {

  try {


    // Get Authorization Header

    const authHeader = req.headers.authorization;



    if (!authHeader) {

      return res.status(401).json({

        success: false,

        message: "Authorization token missing"

      });

    }




    // Check Bearer Token

    if (!authHeader.startsWith("Bearer ")) {

      return res.status(401).json({

        success: false,

        message: "Invalid token format"

      });

    }




    const token = authHeader.split(" ")[1];



    if (!token) {

      return res.status(401).json({

        success: false,

        message: "Token not found"

      });

    }





    // Verify Token

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );





    // Find User

    const user = await User.findById(

      decoded.id

    );




    if (!user) {

      return res.status(404).json({

        success:false,

        message:"User not found"

      });

    }





    // Save User In Request

    req.user = user;




    next();



  } catch(error) {



    console.log(

      "JWT Error:",

      error.message

    );



    return res.status(401).json({

      success:false,

      message:"Unauthorized - Invalid Token"

    });



  }

};




module.exports = isLoggedIn;