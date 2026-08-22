import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";


function Navbar(){


  const { user, logout } = useAuth();



  return (


    <nav className="navbar">



      {/* Logo */}

      <Link
        to="/"
        className="logo-area"
      >

        <img

          src="quickbite-logo.jpg"

          alt="QuickBite Logo"

          className="logo-image"

        />


        <h2>
          QUICKBITE
        </h2>


      </Link>







      {/* Navigation */}

      <div className="nav-links">





        <Link to="/">
          Home
        </Link>





        <Link to="/menu">
          Menu
        </Link>





        <Link to="/cart">
          Cart 🛒
        </Link>








        {

          user ?


          (


            <>


              {/* User Orders */}

            

              <Link to="/profile">
                Profile
              </Link>








              {/* Admin Links */}

              {

                user.role === "admin" &&


                (

                  <>


                    <Link to="/admin">
                      Admin Panel 👨‍💼
                    </Link>




                    <Link to="/admin/orders">
                      All Orders 📦
                    </Link>



                    <Link to="/admin/foods">
                      Foods 🍔
                    </Link>



                    <Link to="/admin/users">
                      Users 👥
                    </Link>



                  </>


                )

              }









              <button

                onClick={logout}

                className="logout-btn"

              >

                Logout

              </button>





            </>


          )


          :


          (


            <>


              <Link to="/login">
                Login
              </Link>





              <Link to="/register">
                Register
              </Link>




            </>


          )


        }





      </div>





    </nav>


  );


}



export default Navbar;