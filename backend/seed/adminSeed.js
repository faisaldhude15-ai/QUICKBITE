const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/User");


const createAdmin = async () => {

    try {

        await connectDB();


        const existingAdmin = await User.findOne({
            email:"admin@quickbite.com"
        });


        if(existingAdmin){

            console.log("⚠️ Admin already exists");

            process.exit();

        }



        const hashedPassword = await bcrypt.hash(
            "123456",
            10
        );



        const admin = await User.create({

            name:"QuickBite Admin",

            email:"admin@quickbite.com",

            password:hashedPassword,

            phone:"03000000000",

            role:"admin",

            address:"QuickBite Head Office"

        });



        console.log("✅ Admin Created Successfully");

        console.log(admin);


        process.exit();



    }
    catch(error){

        console.log(
            "❌ Admin Create Error:",
            error.message
        );

        process.exit(1);

    }

};


createAdmin();