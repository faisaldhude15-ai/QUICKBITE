import axios from "axios";


const api = axios.create({

    baseURL:"http://localhost:5000/api",

    withCredentials:true

});




// ===============================
// Send JWT Token Automatically
// ===============================

api.interceptors.request.use(

    (config)=>{


        const token = localStorage.getItem("token");


        console.log(
            "TOKEN SEND:",
            token
        );



        if(token){

            config.headers.Authorization =
            `Bearer ${token}`;

        }



        return config;


    },


    (error)=>{

        return Promise.reject(error);

    }

);



export default api;