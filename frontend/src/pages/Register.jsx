import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function Register() {


  const navigate = useNavigate();


  const [form, setForm] = useState({

    name: "",
    email: "",
    phone: "",
    password: "",
    address: ""

  });



  const [error, setError] = useState("");



  const handleChange = (e) => {


    setForm({

      ...form,

      [e.target.name]: e.target.value

    });


  };




  const handleSubmit = async (e) => {


    e.preventDefault();


    try {


      const { data } = await api.post(

        "/auth/register",

        form

      );


      console.log(data);



      alert("Registration Successful");


      navigate("/login");



    } catch (error) {


      console.log(error);


      setError(

        error.response?.data?.message ||

        "Registration Failed"

      );


    }


  };




  return (

    <div className="auth-container">


      <h1>
        Register
      </h1>



      {
        error && (

          <p className="error">
            {error}
          </p>

        )
      }




      <form onSubmit={handleSubmit}>


        <input

          type="text"

          name="name"

          placeholder="Full Name"

          value={form.name}

          onChange={handleChange}

          required

        />



        <input

          type="email"

          name="email"

          placeholder="Email"

          value={form.email}

          onChange={handleChange}

          required

        />



        <input

          type="text"

          name="phone"

          placeholder="Phone Number"

          value={form.phone}

          onChange={handleChange}

        />



        <input

          type="password"

          name="password"

          placeholder="Password"

          value={form.password}

          onChange={handleChange}

          required

        />



        <input

          type="text"

          name="address"

          placeholder="Address"

          value={form.address}

          onChange={handleChange}

        />



        <button type="submit">

          Create Account

        </button>



      </form>


    </div>

  );

}


export default Register;