const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");




// =====================================
// REGISTER
// POST /api/auth/register
// =====================================

router.post("/register", async (req, res) => {

    try {


        const {
            name,
            email,
            phone,
            password,
            address
        } = req.body;



        if(!name || !email || !password){

            return res.status(400).json({

                success:false,

                message:"Name, email and password required"

            });

        }



        const checkEmail = email
        .toLowerCase()
        .trim();



        const existingUser =
        await User.findOne({

            email:checkEmail

        });



        if(existingUser){

            return res.status(400).json({

                success:false,

                message:"Email already registered"

            });

        }




        const hashPassword =
        await bcrypt.hash(
            password,
            10
        );





        const user =
        await User.create({

            name,

            email:checkEmail,

            phone,

            address,

            password:hashPassword

        });




        res.status(201).json({

            success:true,

            message:"Register successful",

            user:{

                _id:user._id,

                name:user.name,

                email:user.email

            }


        });



    }
    catch(error){


        console.log(
            "REGISTER ERROR:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


});









// =====================================
// LOGIN
// POST /api/auth/login
// =====================================


router.post("/login", async(req,res)=>{


    try{


        const {

            email,

            password

        } = req.body;




        if(!email || !password){


            return res.status(400).json({

                success:false,

                message:"Email and password required"

            });


        }




        const checkEmail =
        email.toLowerCase().trim();




        const user =
        await User.findOne({

            email:checkEmail

        });





        if(!user){


            return res.status(404).json({

                success:false,

                message:"User not found"

            });


        }





        const match =
        await bcrypt.compare(

            password,

            user.password

        );





        if(!match){


            return res.status(401).json({

                success:false,

                message:"Invalid password"

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







        res.json({


            success:true,


            message:"Login successful",



            token,



            user:{


                _id:user._id,

                name:user.name,

                email:user.email,

                phone:user.phone,

                role:user.role,

                address:user.address,

                profileImage:user.profileImage


            }


        });




    }
    catch(error){


        console.log(
            "LOGIN ERROR:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }



});









// =====================================
// PROFILE
// GET /api/auth/profile
// =====================================


router.get("/profile", authMiddleware, async(req,res)=>{


    try{


        const user =
        await User.findById(
            req.user.id
        )
        .select("-password");




        if(!user){


            return res.status(404).json({

                success:false,

                message:"User not found"

            });


        }





        res.json({

            success:true,

            user

        });





    }
    catch(error){


        console.log(
            "PROFILE ERROR:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


});





module.exports = router;