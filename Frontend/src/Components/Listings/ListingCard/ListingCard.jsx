import { NavLink } from "react-router-dom";
import "./ListingCard.css";

function ListingCard({ listing }) {
  return (
    <NavLink to={`/listings/${listing._id}`} className="listing-links">
      <div className="listing-card">
        <img
          src={listing.image}
          className="listing-card-image"
          alt="Listing_image"
        />

        <div className="listing-card-body">
          <h5 className="listing-card-title">{listing.title}</h5>

          <p className="listing-card-desc">{listing.description}</p>

          <p className="listing-card-price">
            &#x20B9; {listing.price.toLocaleString("en-IN")} / night
            <i className="tax-info">&nbsp;&nbsp;+18% GST</i>
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default ListingCard;
