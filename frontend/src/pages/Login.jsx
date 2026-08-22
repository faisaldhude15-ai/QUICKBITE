import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";



function Login() {


  const navigate = useNavigate();

  const { login } = useAuth();



  const [form, setForm] = useState({

    email: "",
    password: ""

  });



  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);





  const handleChange = (e)=>{


    setForm({

      ...form,

      [e.target.name]: e.target.value

    });


  };






  const handleSubmit = async(e)=>{


    e.preventDefault();


    setError("");

    setLoading(true);



    try{


      const {data} = await api.post(

        "/auth/login",

        form

      );



      console.log(
        "LOGIN RESPONSE:",
        data
      );





      if(!data.token){


        setError(
          "Token not received from server"
        );


        return;


      }






      // =========================
      // Save Token
      // =========================


      localStorage.setItem(

        "token",

        data.token

      );





      // =========================
      // Save User
      // =========================


      localStorage.setItem(

        "user",

        JSON.stringify(data.user)

      );






      // =========================
      // Update Auth Context
      // =========================


      login(

        data.token,

        data.user

      );







      console.log(

        "TOKEN STORED:",

        localStorage.getItem("token")

      );





      alert(
        "Login Successful ✅"
      );





      navigate("/menu");





    }catch(error){



      console.log(

        "LOGIN ERROR:",

        error.response?.data || error.message

      );



      setError(

        error.response?.data?.message ||

        "Login Failed"

      );



    }finally{


      setLoading(false);


    }


  };







  return (


    <div className="auth-container">


      <h1>
        Login
      </h1>





      {
        error &&

        <p className="error">

          {error}

        </p>

      }





      <form onSubmit={handleSubmit}>



        <input


          type="email"


          name="email"


          placeholder="Email"


          value={form.email}


          onChange={handleChange}


          required


        />







        <input


          type="password"


          name="password"


          placeholder="Password"


          value={form.password}


          onChange={handleChange}


          required


        />







        <button type="submit">


          {
            loading

            ?

            "Logging in..."

            :

            "Login"

          }



        </button>




      </form>



    </div>


  );


}



export default Login;