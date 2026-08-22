import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./Cart.css";


function Cart() {


  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);





  // ==========================
  // Fetch Cart
  // ==========================

  const fetchCart = async () => {


    try {


      const { data } = await api.get(
        "/cart"
      );


      console.log(
        "CART RESPONSE:",
        data
      );


      setCart(
        data.cart || []
      );


    }
    catch(error) {


      console.log(
        "FETCH CART ERROR:",
        error.response?.data || error.message
      );


      setCart([]);


    }
    finally {


      setLoading(false);


    }


  };







  useEffect(() => {


    fetchCart();


  }, []);








  // ==========================
  // Remove Item
  // ==========================

  const removeItem = async(id)=>{


    try {


      await api.delete(
        `/cart/${id}`
      );


      fetchCart();


    }
    catch(error){


      console.log(
        "REMOVE ERROR:",
        error.response?.data || error.message
      );


    }


  };










  // ==========================
  // Total Price
  // ==========================

  const total = cart.reduce(

    (sum,item)=>{

      return (
        sum +
        (
          item.price *
          item.quantity
        )
      );

    },

    0

  );









  if(loading){


    return (

      <div className="cart-loading">

        Loading Cart...

      </div>

    );


  }








  return (


    <div className="cart-container">


      <h1>
        My Cart 🛒
      </h1>






      {
        cart.length === 0 ?


        (

          <div className="empty-cart">


            <h2>
              Cart is Empty
            </h2>



            <p>
              Add some delicious food 🍔
            </p>





            <Link
              to="/menu"
              className="menu-btn"
            >

              Browse Menu

            </Link>



          </div>


        )



        :



        (


          <>


            <div className="cart-list">


              {
                cart.map((item)=>(


                  <div

                  className="cart-card"

                  key={item._id}

                  >




                    <img

                    src={

                      item.food?.image

                      ?

                      `http://localhost:5000${item.food.image}`

                      :

                      "https://via.placeholder.com/200"

                    }


                    alt={
                      item.food?.name
                    }


                    className="cart-image"


                    />







                    <div className="cart-info">



                      <h2>

                        {
                          item.food?.name
                          ||
                          "Food Item"
                        }

                      </h2>





                      <p>

                        Price:
                        {" "}
                        Rs {item.price}

                      </p>





                      <p>

                        Quantity:
                        {" "}
                        {item.quantity}

                      </p>





                      <h3>

                        Total:
                        {" "}
                        Rs {item.price * item.quantity}

                      </h3>






                      <button

                      className="remove-btn"

                      onClick={()=>removeItem(item._id)}

                      >

                        Remove ❌

                      </button>





                    </div>






                  </div>


                ))

              }



            </div>








            <div className="cart-total">



              <h2>

                Grand Total:
                {" "}
                Rs {total}

              </h2>






              <Link

              to="/checkout"

              className="checkout-btn"

              >

                Proceed Checkout 🛒

              </Link>





            </div>





          </>


        )

      }






    </div>


  );


}


export default Cart;