import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";


function AdminDashboard() {


  return (


    <div className="admin-dashboard">


      <h1>
        Admin Dashboard 👨‍💼
      </h1>



      <p className="admin-subtitle">
        Welcome to QuickBite Admin Panel
      </p>





      <div className="dashboard-grid">





        {/* Add Food */}

        <Link

          to="/admin/add-food"

          className="dashboard-card"

        >

          <h2>
            ➕ Add Food
          </h2>


          <p>
            Add new food with image
          </p>


        </Link>






        {/* Foods */}

        <Link

          to="/admin/foods"

          className="dashboard-card"

        >

          <h2>
            🍔 Foods
          </h2>


          <p>
            View, Edit & Delete Foods
          </p>


        </Link>







        {/* Orders */}

        <Link

          to="/admin/orders"

          className="dashboard-card"

        >

          <h2>
            📦 Orders
          </h2>


          <p>
            Manage Customer Orders
          </p>


        </Link>








        {/* Users */}

        <Link

          to="/admin/users"

          className="dashboard-card"

        >

          <h2>
            👥 Users
          </h2>


          <p>
            View Registered Users
          </p>


        </Link>





      </div>


    </div>


  );

}



export default AdminDashboard;