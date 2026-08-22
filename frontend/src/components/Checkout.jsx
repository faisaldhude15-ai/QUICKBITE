import React, { useEffect, useState } from "react";
import api from "../api/axios";


function Cart() {


  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);



  const fetchCart = async () => {

    try {

      const { data } = await api.get("/cart");

      setCart(data.cart);


    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };




  useEffect(() => {

    fetchCart();

  }, []);






  const removeItem = async (id) => {

    try {

      await api.delete(`/cart/${id}`);

      fetchCart();


    } catch (error) {

      console.log(error);

    }

  };






  if (loading) {

    return (

      <h2>
        Loading Cart...
      </h2>

    );

  }







  return (

    <div className="cart-page">


      <h1>
        Your Cart 🛒
      </h1>



      {

        cart.length === 0 ? (

          <h2>
            Cart Empty
          </h2>


        ) : (


          cart.map((item) => (


            <div
              className="cart-card"
              key={item._id}
            >


              <img

                src={`http://localhost:5000${item.image}`}

                alt={item.name}

              />



              <div>


                <h2>
                  {item.name}
                </h2>



                <p>
                  Price: Rs {item.price}
                </p>



                <p>
                  Quantity: {item.quantity}
                </p>



                <h3>
                  Total: Rs {item.totalPrice}
                </h3>




                <button

                  onClick={() => removeItem(item._id)}

                >

                  Remove

                </button>



              </div>



            </div>


          ))


        )

      }



    </div>

  );

}



export default Cart;