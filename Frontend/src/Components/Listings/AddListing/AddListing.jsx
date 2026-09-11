import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddListing.css";

function AddListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    country: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const multipartData = new FormData();

    multipartData.append("title", formData.title);
    multipartData.append("description", formData.description);
    multipartData.append("price", formData.price);
    multipartData.append("country", formData.country);
    multipartData.append("location", formData.location);
    multipartData.append("image", formData.image);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/listings`, {
        method: "POST",
        credentials: "include",
        body: multipartData,
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Failed to add listing.");
        return;
      }
      alert(data.message);
      navigate("/");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="listing-form-wrapper">
      <div className="listing-form-card">
        <h1>Add New Listing</h1>

        <p className="listing-form-subtext">
          Share your space with travelers around the world
        </p>

        <form onSubmit={handleSubmit}>
          <div className="listing-form-group">
            <label htmlFor="title">Title</label>

            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <div className="invalid-feedback">Enter a valid title.</div>
          </div>

          <div className="listing-form-group">
            <label htmlFor="description">Description</label>

            <textarea
              name="description"
              id="description"
              placeholder="Describe your listing"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>

            <div className="invalid-feedback">Enter a valid description.</div>
          </div>

          <div className="listing-form-group">
            <label htmlFor="image">Upload Listing Image</label>

            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="listing-form-row">
            <div className="listing-form-group price-group">
              <label htmlFor="price">Price</label>

              <input
                name="price"
                type="number"
                id="price"
                placeholder="Enter the price"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <div className="invalid-feedback">Enter a valid price.</div>
            </div>

            <div className="listing-form-group country-group">
              <label htmlFor="country">Country</label>

              <input
                type="text"
                name="country"
                id="country"
                placeholder="Enter the country"
                value={formData.country}
                onChange={handleChange}
                required
              />

              <div className="invalid-feedback">
                Enter a valid country name.
              </div>
            </div>
          </div>

          <div className="listing-form-group">
            <label htmlFor="location">Location</label>

            <input
              type="text"
              name="location"
              id="location"
              placeholder="Enter the location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <div className="invalid-feedback">Enter a valid location.</div>
          </div>

          <button className="add-listing-btn" type="submit" disabled={loading}>
            {loading ? "Adding Listing..." : "Add Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
