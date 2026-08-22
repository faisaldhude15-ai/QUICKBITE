import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Orders.css";


function Orders(){


  const [orders,setOrders] = useState([]);

  const [loading,setLoading] = useState(true);






  // ================================
  // Get My Orders
  // ================================

  const fetchOrders = async()=>{


    try{


      const {data} = await api.get(
        "/orders/my"
      );



      console.log(
        "MY ORDERS:",
        data
      );



      setOrders(
        data.orders || []
      );



    }
    catch(error){


      console.log(

        "ORDER ERROR:",

        error.response?.data || error.message

      );



      setOrders([]);



    }
    finally{


      setLoading(false);


    }


  };








  useEffect(()=>{


    fetchOrders();


  },[]);









  if(loading){


    return (

      <div className="loading">

        Loading Orders...

      </div>

    );


  }









  return (


    <div className="orders-container">



      <h1>
        My Orders 📦
      </h1>






      {
        orders.length === 0 ?


        (

          <div className="empty-orders">


            <h2>
              No Orders Found
            </h2>



            <p>
              Place your first order 🍔
            </p>



          </div>

        )



        :



        orders.map((order)=>(



          <div

          className="order-card"

          key={order._id}

          >






            <div className="order-header">


              <h2>

                Order #

                {
                  order._id
                  ?
                  order._id.slice(-6)
                  :
                  ""
                }

              </h2>





              <span

              className={
                `status ${
                order.orderStatus
                ?.toLowerCase()
                ||
                "pending"
                }`
              }

              >

                {
                  order.orderStatus
                  ||
                  "Pending"
                }


              </span>



            </div>








            <hr />








            <p>

              <strong>
                Address:
              </strong>

              {" "}

              {
                order.deliveryAddress
                ||
                "N/A"
              }


            </p>







            <p>

              <strong>
                Payment:
              </strong>

              {" "}

              {
                order.paymentMethod
                ||
                "Cash On Delivery"
              }


            </p>







            <p>

              <strong>
                Payment Status:
              </strong>

              {" "}

              {
                order.paymentStatus
                ||
                "Pending"
              }


            </p>








            <h3>
              Items 🍔
            </h3>







            {
              order.items?.map((item)=>(



                <div

                className="order-item"

                key={item._id}

                >





                  <div>


                    <h4>

                    {
                      item.food?.name
                      ||
                      "Food Item"

                    }

                    </h4>



                    {
                      item.food?.image &&

                      <img

                      src={
                        `http://localhost:5000${item.food.image}`
                      }

                      alt="food"

                      className="order-food-image"

                      />

                    }


                  </div>







                  <span>


                    {
                      item.quantity
                    }

                    {" × "}

                    Rs

                    {
                      item.price
                    }


                  </span>





                </div>



              ))

            }








            <hr />







            <h2>

              Total:

              {" "}

              Rs

              {
                order.totalAmount
                ||
                order.totalPrice
                ||
                0
              }


            </h2>







          </div>


        ))


      }






    </div>


  );


}



export default Orders;