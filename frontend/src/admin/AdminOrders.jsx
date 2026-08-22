import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./AdminOrders.css";


function AdminOrders() {


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);





  // =====================================
  // Get All Orders
  // =====================================


  const fetchOrders = async()=>{


    try{


      const {data} = await api.get(
        "/orders/all"
      );


      console.log(
        "ALL ORDERS:",
        data
      );


      setOrders(
        data.orders || []
      );



    }
    catch(error){


      console.log(
        "ORDERS ERROR:",
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









  // =====================================
  // Update Order Status
  // =====================================


  const updateStatus = async(id,status)=>{


    try{


      const {data} = await api.put(

        `/orders/status/${id}`,

        {
          orderStatus:status
        }

      );


      alert(
        data.message || "Status Updated"
      );


      fetchOrders();



    }
    catch(error){


      console.log(
        "STATUS UPDATE ERROR:",
        error.response?.data || error.message
      );


      alert(
        "Unable to update status"
      );


    }


  };








  if(loading){


    return (

      <h2>
        Loading Orders...
      </h2>

    );


  }









  return (


    <div className="admin-orders">


      <h1>
        Admin Orders Dashboard 📦
      </h1>





      {
        orders.length === 0 ?


        (

          <div className="no-orders">

            <h2>
              No Orders Found
            </h2>


          </div>

        )


        :


        orders.map((order)=>(


          <div

          className="admin-order-card"

          key={order._id}

          >






            <div className="order-top">


              <h2>

                Order #
                {order._id.slice(-6)}

              </h2>






              <select


                value={
                  order.orderStatus || "Pending"
                }


                onChange={(e)=>

                  updateStatus(

                    order._id,

                    e.target.value

                  )

                }


              >


                <option>
                  Pending
                </option>


                <option>
                  Confirmed
                </option>


                <option>
                  Preparing
                </option>


                <option>
                  Out for Delivery
                </option>


                <option>
                  Delivered
                </option>


                <option>
                  Cancelled
                </option>


              </select>



            </div>







            <hr />





            <p>
              <b>
                Customer:
              </b>{" "}
              {order.user?.name || "Guest"}
            </p>




            <p>
              <b>
                Email:
              </b>{" "}
              {order.user?.email || "N/A"}
            </p>




            <p>
              <b>
                Phone:
              </b>{" "}
              {order.user?.phone || "N/A"}
            </p>




            <p>
              <b>
                Address:
              </b>{" "}
              {order.deliveryAddress}
            </p>




            <p>
              <b>
                Payment:
              </b>{" "}
              {order.paymentMethod}
            </p>




            <p>
              <b>
                Payment Status:
              </b>{" "}
              {order.paymentStatus}
            </p>







            <h3>
              Order Items 🍔
            </h3>





            {
              order.items?.map((item)=>(


                <div

                className="admin-order-item"

                key={item._id}

                >



                  <span>
                    {item.food?.name}
                  </span>




                  <span>
                    {item.quantity}
                    {" × "}
                    Rs {item.price}
                  </span>



                </div>



              ))
            }







            <hr />





            <h2>

              Total:
              {" "}
              Rs {order.totalAmount}

            </h2>





          </div>


        ))

      }




    </div>


  );


}



export default AdminOrders;