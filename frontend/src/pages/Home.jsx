import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


function Home(){

return (

<div className="home">


{/* ================= HERO ================= */}

<section className="hero">


<div className="hero-content">


<h1>
  Delicious Food
  <span> Delivered Fast 🍔</span>
</h1>


<p>
  Fresh meals, amazing taste and quick delivery.
  Order your favorite food from QuickBite.
</p>


<div className="hero-buttons">


<Link
to="/menu"
className="btn primary"
>
  Order Now
</Link>



<Link
to="/menu"
className="btn secondary"
>
  View Menu
</Link>


</div>


</div>





<div className="hero-image">


<img

src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"

alt="Food"

/>


</div>


</section>





{/* ================= FEATURES ================= */}


<section className="features">


<h2>
Why Choose QuickBite? 🚀
</h2>



<div className="feature-grid">



<div className="feature-card">

<h3>
🍕 Fresh Food
</h3>

<p>
Fresh ingredients and delicious taste.
</p>

</div>





<div className="feature-card">

<h3>
🚚 Fast Delivery
</h3>

<p>
Quick delivery at your doorstep.
</p>

</div>





<div className="feature-card">

<h3>
💳 Easy Payment
</h3>

<p>
Cash, Card and Online payment options.
</p>

</div>



</div>


</section>






{/* ================= POPULAR ================= */}



<section className="popular">


<h2>
Popular Foods 🍔
</h2>



<div className="food-preview">



<div>
🍔
<h3>
Burger
</h3>
</div>



<div>
🍕
<h3>
Pizza
</h3>
</div>



<div>
🍗
<h3>
Chicken
</h3>
</div>



<div>
🍟
<h3>
Fries
</h3>
</div>



</div>


</section>






{/* ================= CTA ================= */}


<section className="cta">


<h2>
Hungry? Order Now 😋
</h2>


<Link
to="/menu"
className="btn primary"
>
Start Ordering
</Link>


</section>



</div>


);


}


export default Home;