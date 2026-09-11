import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditListing.css";

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    country: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/listings/${id}`,
          {
            credentials: "include",
          },
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        const listing = data.listing;
        setFormData({
          title: listing.title,
          description: listing.description,
          price: listing.price,
          country: listing.country,
          location: listing.location,
        });
        setCurrentImage(listing.image);
      } catch (err) {
        // Error handled silently
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const multipartData = new FormData();

      multipartData.append("title", formData.title);
      multipartData.append("description", formData.description);
      multipartData.append("price", formData.price);
      multipartData.append("country", formData.country);
      multipartData.append("location", formData.location);

      if (image) {
        multipartData.append("image", image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/listings/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: multipartData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update listing.");
        return;
      }
      alert(data.message);
      navigate(`/listings/${id}`);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-listing-wrapper">
      <div className="edit-listing-card">
        <h1>Edit Your Listing</h1>

        <p className="edit-listing-subtext">
          Update the details of your listing
        </p>

        <form onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label htmlFor="title">Title</label>

            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="image">Upload New Listing Image</label>

            {currentImage && (
              <img
                src={currentImage}
                alt="Current Listing"
                className="current-listing-image"
              />
            )}

            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
            />
          </div>

          <div className="edit-form-row">
            <div className="edit-form-group price-group">
              <label htmlFor="price">Price</label>

              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="edit-form-group country-group">
              <label htmlFor="country">Country</label>

              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="edit-form-group">
            <label htmlFor="location">Location</label>

            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="edit-listing-btn" disabled={loading}>
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditListing;
