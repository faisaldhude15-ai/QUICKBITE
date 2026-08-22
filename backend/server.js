require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/db");


// =======================
// Routes
// =======================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");



// =======================
// Express App
// =======================

const app = express();



// =======================
// Database Connection
// =======================

connectDB();



// =======================
// Upload Folder Create
// =======================

const uploadPath = path.join(
    __dirname,
    "uploads"
);


if(!fs.existsSync(uploadPath)){

    fs.mkdirSync(
        uploadPath,
        {
            recursive:true
        }
    );

    console.log("✅ Upload folder created");

}




// =======================
// Middlewares
// =======================


app.use(
    cors({

        origin:"http://localhost:5173",

        credentials:true

    })
);



app.use(
    express.json()
);



app.use(
    express.urlencoded({
        extended:true
    })
);




// =======================
// Static Files
// =======================


app.use(
    "/uploads",
    express.static(uploadPath)
);





// =======================
// API Routes
// =======================


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/users",
    userRoutes
);


app.use(
    "/api/foods",
    foodRoutes
);


app.use(
    "/api/categories",
    categoryRoutes
);


app.use(
    "/api/cart",
    cartRoutes
);


app.use(
    "/api/orders",
    orderRoutes
);


app.use(
    "/api/admin",
    adminRoutes
);






// =======================
// Test API
// =======================


app.get("/",(req,res)=>{


    res.json({

        success:true,

        message:"🚀 QuickBite API Running Successfully"

    });


});







// =======================
// 404 Handler
// =======================


app.use((req,res)=>{


    res.status(404).json({

        success:false,

        message:"API Route Not Found"

    });


});







// =======================
// Global Error Handler
// =======================


app.use(
(err,req,res,next)=>{


    console.log(
        "========== SERVER ERROR =========="
    );


    console.log(err);


    console.log(
        "=================================="
    );



    res.status(
        err.status || 500
    )
    .json({

        success:false,

        message:
        err.message ||
        "Internal Server Error"

    });



});








// =======================
// Server Start
// =======================


const PORT =
process.env.PORT || 5000;



app.listen(PORT,()=>{


    console.log(
        `✅ Server running on port ${PORT}`
    );


});