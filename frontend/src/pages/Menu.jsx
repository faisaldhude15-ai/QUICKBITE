import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Menu.css";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Get Foods
  // =========================
  const getFoods = async () => {
    try {
      const { data } = await api.get("/foods");
      console.log("FOODS RESPONSE:", data);
      setFoods(data.foods || []);
    } catch (error) {
      console.log("FOODS ERROR:", error.response?.data || error.message);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  // =========================
  // Add To Cart
  // =========================
  const addToCart = async (foodId) => {
    try {
      console.log("FOOD ID:", foodId);
      const { data } = await api.post("/cart/add", {
        foodId,
        quantity: 1
      });
      console.log("CART RESPONSE:", data);
      alert("Food Added To Cart 🛒");
    } catch (error) {
      console.log("ADD CART ERROR:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert("Please Login First");
      } else {
        alert("Unable To Add Cart");
      }
    }
  };

  if (loading) {
    return (
      <div className="menu-loading">
        <h2>Loading Delicious Foods...</h2>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <h1>Our Food Menu 🍔</h1>

      {foods.length === 0 ? (
        <div className="no-food">
          <h2>No Food Available At The Moment</h2>
        </div>
      ) : (
        <div className="food-grid">
          {foods.map((food) => (
            <div className="food-card" key={food._id}>
              <img
                src={
                  food.image
                    ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${food.image}`
                    : "https://via.placeholder.com/300"
                }
                alt={food.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300";
                }}
              />

              <div className="food-card-body">
                <h2>{food.name}</h2>
                <p>{food.description || "Fresh and delicious food item."}</p>
                <h3>Rs {food.price}</h3>
                <button onClick={() => addToCart(food._id)}>
                  Add To Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
