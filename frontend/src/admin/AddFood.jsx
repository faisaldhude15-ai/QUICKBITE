import React, { useState } from "react";
import api from "../api/axios";
import "./AddFood.css";


function AddFood() {


  const [food, setFood] = useState({

    name:"",
    description:"",
    price:"",
    category:"",
    isAvailable:true

  });



  const [image,setImage] = useState(null);

  const [preview,setPreview] = useState("");

  const [loading,setLoading] = useState(false);





  // =========================
  // Input Change
  // =========================

  const handleChange = (e)=>{


    const {name,value}=e.target;


    setFood({

      ...food,

      [name]:value

    });


  };





  // =========================
  // Image Select
  // =========================

  const handleImage = (e)=>{


    const file = e.target.files[0];


    setImage(file);


    if(file){

      setPreview(
        URL.createObjectURL(file)
      );

    }


  };







  // =========================
  // Submit Food
  // =========================


  const handleSubmit = async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);



      const formData = new FormData();



      formData.append(
        "name",
        food.name
      );


      formData.append(
        "description",
        food.description
      );


      formData.append(
        "price",
        food.price
      );


      formData.append(
        "category",
        food.category
      );


      formData.append(
        "isAvailable",
        food.isAvailable
      );



      if(image){

        formData.append(
          "image",
          image
        );

      }





      const {data}= await api.post(

        "/foods",

        formData

      );





      console.log(
        "ADD FOOD:",
        data
      );



      alert(
        "Food Added Successfully 🍔"
      );





      setFood({

        name:"",
        description:"",
        price:"",
        category:"",
        isAvailable:true

      });



      setImage(null);

      setPreview("");




    }

    catch(error){


      console.log(

        "ADD FOOD ERROR:",

        error.response?.data || error.message

      );


      alert(
        "Unable to add food"
      );


    }


    finally{


      setLoading(false);


    }


  };






  return (



    <div className="add-food">



      <h1>
        Add New Food 🍔
      </h1>




      <form onSubmit={handleSubmit}>


        <input

          type="text"

          name="name"

          placeholder="Food Name"

          value={food.name}

          onChange={handleChange}

          required

        />




        <textarea

          name="description"

          placeholder="Food Description"

          value={food.description}

          onChange={handleChange}

          required

        />





        <input

          type="number"

          name="price"

          placeholder="Price"

          value={food.price}

          onChange={handleChange}

          required

        />





        <input

          type="text"

          name="category"

          placeholder="Category"

          value={food.category}

          onChange={handleChange}

          required

        />






        <input

          type="file"

          accept="image/*"

          onChange={handleImage}

          required

        />






        {
          preview &&

          <img

            src={preview}

            alt="preview"

            className="food-preview"

          />

        }







        <button

          type="submit"

          disabled={loading}

        >

          {
            loading
            ?
            "Adding..."
            :
            "Add Food"
          }


        </button>





      </form>




    </div>


  );


}



export default AddFood;