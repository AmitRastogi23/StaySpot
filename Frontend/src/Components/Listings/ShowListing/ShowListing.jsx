import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./ShowListing.css";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

function ShowListing() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReviewDeleteModal, setShowReviewDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: 5,
  });
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/listings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data.listing);
        setReviews(data.listing.reviews || []);
      })
      .catch((err) => {
        // some error
      });
  }, [id]);

  if (!listing) {
    return <p className="loading-text">Loading...</p>;
  }

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/listings/${listing._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Failed to delete listing.");
        return;
      }
      alert(data.message);
      navigate("/");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${listing._id}/new`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Failed to add review.");
        return;
      }
      alert(data.message);
      setReviews((prev) => [...prev, data.review]);
      setReviewData({
        comment: "",
        rating: 5,
      });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setReviewLoading(false);
    }
  };

  const handleReviewDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${listing._id}/${showReviewDeleteModal}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Failed to delete review.");
        return;
      }
      setReviews((prev) =>
        prev.filter((review) => review._id !== showReviewDeleteModal),
      );
      setShowReviewDeleteModal(null);
      alert(data.message);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="listing-detail-wrapper">
      <h1 className="listing-detail-title">{listing.title}</h1>

      <div className="listing-detail-grid">
        <div>
          <img
            src={listing.image}
            className="listing-detail-image"
            alt="Listing_Image"
          />

          <p className="listing-owner-tag">
            Posted by <b>{listing.owner?.username}</b>
          </p>
        </div>

        <div className="listing-info-panel">
          <p className="listing-desc">{listing.description}</p>
          <ul className="listing-detail-facts">
            <li>
              <span className="fact-label">Price</span>
              <span className="fact-value">
                &#x20B9; {listing.price.toLocaleString("en-IN")} / night
              </span>
            </li>
            <li>
              <span className="fact-label">Location</span>
              <span className="fact-value">{listing.location}</span>
            </li>
            <li>
              <span className="fact-label">Country</span>
              <span className="fact-value">{listing.country}</span>
            </li>
          </ul>

          {currentUser && currentUser.id === listing.owner?._id && (
            <div className="listing-owner-actions">
              <NavLink
                to={`/listings/edit/${listing._id}`}
                className="edit-btn"
              >
                Edit
              </NavLink>
              <button
                className="show-btn"
                type="button"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="review-section">
        <h4>Leave a Review</h4>

        <div className="review-form">
          <form onSubmit={handleReviewSubmit}>
            {/* Comment */}
            <textarea
              name="comment"
              id="comment"
              placeholder="Write your review"
              rows="4"
              value={reviewData.comment}
              onChange={handleReviewChange}
              required
            />

            {/* Rating + Button */}
            <div className="review-submit-row">
              <div>
                <label className="form-label">Rating</label>
                <fieldset className="starability-slot">
                  <input
                    type="radio"
                    id="first-rate5"
                    name="rating"
                    onChange={handleReviewChange}
                    value="5"
                  />
                  <label htmlFor="first-rate5" title="Amazing">
                    5 stars
                  </label>

                  <input
                    type="radio"
                    id="first-rate4"
                    name="rating"
                    onChange={handleReviewChange}
                    value="4"
                  />
                  <label htmlFor="first-rate4" title="Very good">
                    4 stars
                  </label>

                  <input
                    type="radio"
                    id="first-rate3"
                    name="rating"
                    onChange={handleReviewChange}
                    value="3"
                  />
                  <label htmlFor="first-rate3" title="Average">
                    3 stars
                  </label>

                  <input
                    type="radio"
                    id="first-rate2"
                    name="rating"
                    onChange={handleReviewChange}
                    value="2"
                  />
                  <label htmlFor="first-rate2" title="Not good">
                    2 stars
                  </label>

                  <input
                    type="radio"
                    id="first-rate1"
                    name="rating"
                    value="1"
                    onChange={handleReviewChange}
                  />
                  <label htmlFor="first-rate1" title="Terrible">
                    1 star
                  </label>
                </fieldset>
              </div>

              <button
                type="submit"
                className="btn add-btn"
                disabled={reviewLoading}
              >
                <i className="fa-solid fa-plus"></i>
                {reviewLoading ? "Adding Review..." : "Add Review"}
              </button>
            </div>
          </form>
        </div>

        {/* All Reviews */}
        {reviews.length > 0 && (
          <>
            <h5 className="reviews-heading">All Reviews</h5>

            <div className="reviews-grid">
              {reviews.map((review) => (
                <div className="review-card" key={review._id}>
                  <div className="review-author">
                    <div className="review-avatar">
                      {review.author?.username?.charAt(0).toUpperCase()}
                    </div>

                    <div className="review-author-name">
                      @ {review.author?.username}
                    </div>

                    {currentUser && currentUser.id === review.author?._id && (
                      <button
                        type="button"
                        className="review-delete-btn"
                        onClick={() => setShowReviewDeleteModal(review._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                        Delete
                      </button>
                    )}
                  </div>

                  <div className="review-rating-text">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>

                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Delete Listing?</h2>
            <p>
              Are you sure you want to delete this listing?
              <br />
              Once deleted, it can't be recovered.
            </p>
            <div className="delete-modal-actions">
              <button
                type="button"
                className="cancel-delete-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-delete-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showReviewDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Delete Review?</h2>

            <p>
              Are you sure you want to delete this review?
              <br />
              Once deleted, it can't be recovered.
            </p>

            <div className="delete-modal-actions">
              <button
                type="button"
                className="cancel-delete-btn"
                onClick={() => setShowReviewDeleteModal(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete-btn"
                onClick={handleReviewDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowListing;
