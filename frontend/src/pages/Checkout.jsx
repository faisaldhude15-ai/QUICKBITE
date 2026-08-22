import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  // =====================================
  // Place Order
  // =====================================

  const placeOrder = async (e) => {

    e.preventDefault();

    if (!address.trim()) {
      alert("Delivery address is required");
      return;
    }

    try {

      setLoading(true);

      const { data } = await api.post(
        "/orders/place",
        {
          deliveryAddress: address,
          paymentMethod
        }
      );

      console.log("ORDER RESPONSE:", data);

      alert(data.message || "Order placed successfully");

      navigate("/orders");

    } catch (error) {

      console.log(
        "ORDER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Unable to place order"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="checkout-container">

      <h1>Checkout 🛒</h1>

      <form onSubmit={placeOrder}>

        <label>Delivery Address</label>

        <textarea
          placeholder="Enter your complete delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label>Payment Method</label>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Cash on Delivery">
            Cash on Delivery
          </option>

          <option value="Online Payment">
            Online Payment
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </form>

    </div>

  );

}

export default Checkout;