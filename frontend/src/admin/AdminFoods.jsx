import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./AdminFoods.css";


function AdminFoods(){


const [foods,setFoods] = useState([]);

const [loading,setLoading] = useState(true);





// ==============================
// Get Foods
// ==============================

const getFoods = async()=>{


try{


const {data}= await api.get(
"/foods"
);


console.log(
"ADMIN FOODS:",
data
);



setFoods(
data.foods || []
);



}
catch(error){


console.log(
error.response?.data || error.message
);


}
finally{


setLoading(false);


}


};





useEffect(()=>{


getFoods();


},[]);








// ==============================
// Delete Food
// ==============================


const deleteFood = async(id)=>{


const confirmDelete = window.confirm(
"Delete this food?"
);


if(!confirmDelete)
return;



try{


const {data}= await api.delete(

`/foods/${id}`

);



alert(
data.message
);



getFoods();



}
catch(error){


console.log(
error.response?.data || error.message
);


alert(
"Delete failed"
);



}



};







if(loading){


return (

<h2>
Loading Foods...
</h2>

);


}







return (


<div className="admin-foods">



<div className="foods-header">


<h1>
Manage Foods 🍔
</h1>



<Link

to="/admin/add-food"

className="add-food-btn"

>

➕ Add Food

</Link>



</div>







<div className="foods-grid">



{

foods.length === 0 ?


<h2>
No Foods Found
</h2>



:


foods.map((food)=>(



<div

className="food-admin-card"

key={food._id}

>




<img

src={

food.image
?
`http://localhost:5000${food.image}`
:
"https://via.placeholder.com/200"

}

alt={food.name}

/>






<h2>

{food.name}

</h2>




<p>

Rs {food.price}

</p>



<p>

{food.category}

</p>




<span>

{
food.isAvailable
?
"Available ✅"
:
"Not Available ❌"
}

</span>





<div className="food-actions">



<Link

to={`/admin/edit-food/${food._id}`}

className="edit-btn"

>

Edit

</Link>





<button

onClick={()=>deleteFood(food._id)}

className="delete-btn"

>

Delete

</button>




</div>



</div>



))


}



</div>


</div>


);


}



export default AdminFoods;