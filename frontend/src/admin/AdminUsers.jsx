import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./AdminUsers.css";


function AdminUsers(){


const [users,setUsers] = useState([]);

const [loading,setLoading] = useState(true);





// =============================
// Get All Users
// =============================

const getUsers = async()=>{


try{


const {data}= await api.get(
"/admin/users"
);



console.log(
"ADMIN USERS:",
data
);



setUsers(
data.users || []
);



}
catch(error){


console.log(

"USERS ERROR:",
error.response?.data || error.message

);


}
finally{


setLoading(false);


}


};







useEffect(()=>{


getUsers();


},[]);







// =============================
// Delete User
// =============================


const deleteUser = async(id)=>{


const confirmDelete =
window.confirm(
"Delete this user?"
);



if(!confirmDelete)
return;



try{


const {data}=await api.delete(

`/admin/users/${id}`

);



alert(
data.message
);



getUsers();



}
catch(error){


console.log(

error.response?.data || error.message

);


alert(
"Unable to delete user"
);



}



};







if(loading){


return (

<h2>
Loading Users...
</h2>

);


}







return (

<div className="admin-users">


<h1>
Registered Users 👥
</h1>





<div className="users-table">



<table>


<thead>


<tr>

<th>
Name
</th>


<th>
Email
</th>


<th>
Phone
</th>


<th>
Role
</th>


<th>
Action
</th>


</tr>


</thead>





<tbody>


{

users.length === 0 ?


<tr>

<td colSpan="5">

No Users Found

</td>

</tr>



:


users.map((user)=>(



<tr key={user._id}>


<td>
{user.name}
</td>



<td>
{user.email}
</td>



<td>
{user.phone}
</td>



<td>

<span className="role">

{user.role}

</span>

</td>





<td>


<button

className="delete-user"

onClick={()=>deleteUser(user._id)}

>

Delete

</button>



</td>



</tr>



))


}



</tbody>



</table>



</div>



</div>

);


}


export default AdminUsers;