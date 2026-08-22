import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditFood() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    getFood();
    getCategories();
  }, []);

  const getFood = async () => {
    try {
      const { data } = await api.get(`/foods/${id}`);

      setForm({
        name: data.food.name,
        description: data.food.description,
        price: data.food.price,
        category: data.food.category,
        image: null,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    if (e.target.name === "image") {
      setForm({
        ...form,
        image: e.target.files[0],
      });
      return;
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateFood = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);

      if (form.image) {
        formData.append("image", form.image);
      }

      const { data } = await api.put(
        `/foods/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(data.message);

      navigate("/admin/foods");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h1>Edit Food</h1>

      <form
        className="food-form"
        onSubmit={updateFood}
      >

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          rows="5"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat.name}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Food"}
        </button>

      </form>

    </div>
  );
}

export default EditFood;