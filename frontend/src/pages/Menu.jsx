import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Menu.css";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Get All Foods
  // ===============================
  const getFoods = async () => {
    try {
      setLoading(true);

      const response = await api.get("/foods");

      console.log("FOODS RESPONSE:", response.data);

      if (response.data?.foods) {
        setFoods(response.data.foods);
      } else if (Array.isArray(response.data)) {
        setFoods(response.data);
      } else {
        setFoods([]);
      }
    } catch (error) {
      console.error(
        "FOODS ERROR:",
        error.response?.data || error.message
      );

      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  // ===============================
  // Add Food To Cart
  // ===============================
  const addToCart = async (foodId) => {
    try {
      const response = await api.post("/cart/add", {
        foodId,
        quantity: 1,
      });

      console.log("CART RESPONSE:", response.data);

      alert("Food Added To Cart 🛒");
    } catch (error) {
      console.error(
        "ADD CART ERROR:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        alert("Please Login First");
      } else {
        alert("Unable To Add Cart");
      }
    }
  };

  // ===============================
  // Loading
  // ===============================
  if (loading) {
    return (
      <div className="menu-loading">
        <h2>Loading Delicious Foods... 🍔</h2>
      </div>
    );
  }

  // ===============================
  // Menu
  // ===============================
  return (
    <div className="menu-container">

      <h1>Our Food Menu 🍔</h1>

      {foods.length === 0 ? (
        <div className="no-food">
          <h2>No Food Available At The Moment</h2>
          <p>Please check again later.</p>
        </div>
      ) : (
        <div className="food-grid">

          {foods.map((food) => {

            const imageUrl = food.image
              ? food.image.startsWith("http")
                ? food.image
                : `${import.meta.env.VITE_SERVER_URL}${food.image}`
              : "https://via.placeholder.com/300x200?text=No+Image";

            return (
              <div
                className="food-card"
                key={food._id}
              >

                <img
                  src={imageUrl}
                  alt={food.name || "Food"}
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />

                <div className="food-card-body">

                  <h2>
                    {food.name}
                  </h2>

                  <p>
                    {food.description ||
                      "Fresh and delicious food item."}
                  </p>

                  <h3>
                    Rs {food.price}
                  </h3>

                  <button
                    onClick={() => addToCart(food._id)}
                  >
                    Add To Cart 🛒
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Menu;