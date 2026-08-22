require("dotenv").config();

const connectDB = require("../config/db");
const Food = require("../models/Food");

const foods = [

  {
    name: "Chicken Biryani",
    description: "Special Karachi Chicken Biryani",
    price: 450,
    category: "Rice",
    image: "/uploads/biryani.png",
    isAvailable: true,
  },

  {
    name: "Chicken Karahi",
    description: "Traditional Chicken Karahi",
    price: 1400,
    category: "Karahi",
    image: "/uploads/chicken-karahi.png",
    isAvailable: true,
  },

  {
    name: "Mutton Karahi",
    description: "Delicious Mutton Karahi",
    price: 1800,
    category: "Karahi",
    image: "/uploads/mutton-karahi.png",
    isAvailable: true,
  },

  {
    name: "Chicken Pulao",
    description: "Fresh Chicken Pulao",
    price: 400,
    category: "Rice",
    image: "/uploads/pulao.png",
    isAvailable: true,
  },

  {
    name: "Chicken Handi",
    description: "Creamy Chicken Handi",
    price: 1300,
    category: "Handi",
    image: "/uploads/handi.png",
    isAvailable: true,
  },

  {
  name: "Seekh Kebab",
  description: "Fresh BBQ Seekh Kebab",
  price: 600,
  category: "BBQ",
  image: "/uploads/seekh-kebab.png",
  isAvailable: true,
},
{
  name: "Chicken Tikka",
  description: "Charcoal Grilled Chicken Tikka",
  price: 700,
  category: "BBQ",
  image: "/uploads/tikka.png",
  isAvailable: true,
},

  {
    name: "Nihari",
    description: "Traditional Beef Nihari",
    price: 550,
    category: "Desi",
    image: "/uploads/nihari.png",
    isAvailable: true,
  },

  {
    name: "Halwa Puri",
    description: "Fresh Halwa Puri Breakfast",
    price: 350,
    category: "Breakfast",
    image: "/uploads/halwa-puri.png",
    isAvailable: true,
  },

  {
    name: "Chicken Haleem",
    description: "Special Chicken Haleem",
    price: 450,
    category: "Desi",
    image: "/uploads/haleem.png",
    isAvailable: true,
  }

];

const seedFoods = async () => {
  try {

    await connectDB();

    // Purane foods delete karega
    await Food.deleteMany({});

    // Naye foods insert karega
    await Food.insertMany(foods);

    console.log("✅ 10 Desi Foods Inserted Successfully");

    process.exit(0);

  } catch (error) {

    console.error("❌ Food Seed Error:", error.message);

    process.exit(1);

  }
};

seedFoods();