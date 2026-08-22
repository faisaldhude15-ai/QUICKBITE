import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Delicious Food Delivered To Your Door</h1>

        <p>
          Fresh meals from your favorite restaurants with fast delivery.
        </p>

        <div className="hero-buttons">
          <Link to="/menu" className="btn">
            Order Now
          </Link>

          <Link to="/register" className="btn btn-outline">
            Join Now
          </Link>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900"
          alt="Food"
        />
      </div>
    </section>
  );
}

export default Hero;