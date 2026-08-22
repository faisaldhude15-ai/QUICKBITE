import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Profile.css";


function Profile(){


  const [user,setUser] = useState(null);

  const [loading,setLoading] = useState(true);





  // =========================
  // Get Profile
  // =========================


  useEffect(()=>{


    const getProfile = async()=>{


      try{


        const {data} = await api.get(
          "/users/profile"
        );


        console.log(
          "PROFILE DATA:",
          data
        );


        setUser(
          data.user
        );


      }
      catch(error){


        console.log(
          "PROFILE ERROR:",
          error.response?.data || error.message
        );


      }
      finally{


        setLoading(false);


      }


    };


    getProfile();


  },[]);









  if(loading){


    return (

      <div className="profile-loading">

        <div className="loader"></div>

        <h2>
          Loading Profile...
        </h2>


      </div>

    );

  }








  if(!user){


    return (

      <div className="profile-login">


        <h1>
          🔒 Please Login First
        </h1>


        <p>
          Login to view your profile
        </p>


      </div>

    );


  }








  return (


    <div className="profile-page">



      <div className="profile-card">





        <div className="profile-header">


          <div className="profile-avatar">


            <img

              src={
                user.picture
                ?
                `http://localhost:5000${user.picture}`
                :
                "https://ui-avatars.com/api/?name="+user.name
              }

              alt="profile"

            />


          </div>




          <h1>
            {user.name}
          </h1>




          <span className="role-badge">

            {user.role || "User"}

          </span>


        </div>








        <div className="profile-details">



          <div className="detail-box">

            <span>
              📧 Email
            </span>

            <h3>
              {user.email}
            </h3>

          </div>






          <div className="detail-box">

            <span>
              📱 Phone
            </span>

            <h3>
              {user.phone || "Not Added"}
            </h3>

          </div>






          <div className="detail-box">

            <span>
              📍 Address
            </span>

            <h3>
              {user.address || "Not Added"}
            </h3>

          </div>






          <div className="detail-box">

            <span>
              👤 Account Type
            </span>

            <h3>
              {user.role}
            </h3>

          </div>





        </div>





      </div>




    </div>


  );


}



export default Profile;