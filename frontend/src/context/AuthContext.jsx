import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../api/axios";


// Create Context
const AuthContext = createContext();




// Provider
export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);





  // ==========================
  // Check Login User
  // ==========================

  useEffect(() => {


    const checkUser = async () => {


      const token = localStorage.getItem("token");



      if(!token){

        setLoading(false);

        return;

      }





      try {


        const res = await api.get(
          "/auth/profile"
        );



        setUser(res.data.user);



        localStorage.setItem(

          "user",

          JSON.stringify(res.data.user)

        );



      }
      catch(error){


        console.log(
          "PROFILE ERROR:",
          error.response?.data || error.message
        );



        localStorage.removeItem("token");

        localStorage.removeItem("user");


        setUser(null);


      }
      finally{


        setLoading(false);


      }



    };



    checkUser();


  }, []);









  // ==========================
  // Login
  // ==========================

  const login = (token, userData) => {


    localStorage.setItem(

      "token",

      token

    );



    localStorage.setItem(

      "user",

      JSON.stringify(userData)

    );



    setUser(userData);



  };









  // ==========================
  // Logout
  // ==========================

  const logout = () => {


    localStorage.removeItem(
      "token"
    );


    localStorage.removeItem(
      "user"
    );



    setUser(null);



  };







  return (

    <AuthContext.Provider

      value={{

        user,

        login,

        logout,

        loading

      }}

    >

      {children}

    </AuthContext.Provider>

  );


};








// Hook
export const useAuth = () => {


  return useContext(AuthContext);


};