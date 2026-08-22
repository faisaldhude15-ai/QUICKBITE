import React from "react";
import { Routes, Route } from "react-router-dom";


// ================================
// Components
// ================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


// ================================
// User Pages
// ================================

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";


// ================================
// Admin Pages
// ================================

import AdminDashboard from "./admin/AdminDashboard";
import AdminFoods from "./admin/AdminFoods";
import AddFood from "./admin/AddFood";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";





function App(){


  return (

    <>


      {/* Navbar */}

      <Navbar />





      <main className="main-container">


        <Routes>



          {/* ================================
                    USER ROUTES
          ================================= */}



          <Route
            path="/"
            element={<Home />}
          />



          <Route
            path="/menu"
            element={<Menu />}
          />



          <Route
            path="/login"
            element={<Login />}
          />



          <Route
            path="/register"
            element={<Register />}
          />



          <Route
            path="/cart"
            element={<Cart />}
          />



          <Route
            path="/checkout"
            element={<Checkout />}
          />



          {/* User My Orders */}

          <Route
            path="/orders"
            element={<Orders />}
          />



          <Route
            path="/profile"
            element={<Profile />}
          />









          {/* ================================
                    ADMIN ROUTES
          ================================= */}



          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={<AdminDashboard />}
          />



          <Route
            path="/admin"
            element={<AdminDashboard />}
          />






          {/* Foods */}

          <Route
            path="/admin/foods"
            element={<AdminFoods />}
          />






          {/* Add Food */}

          <Route
            path="/admin/add-food"
            element={<AddFood />}
          />






          {/* All Orders */}

          <Route
            path="/admin/orders"
            element={<AdminOrders />}
          />






          {/* Users */}

          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />









          {/* ================================
                    404 PAGE
          ================================= */}



          <Route

            path="*"

            element={

              <div className="not-found">


                <h1>
                  404
                </h1>


                <p>
                  Page Not Found
                </p>


              </div>

            }

          />



        </Routes>



      </main>







      {/* Footer */}

      <Footer />



    </>

  );

}



export default App;