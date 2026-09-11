import { useEffect, useState } from "react";
import ListingCard from "./ListingCard/ListingCard";
import "./Listings.css";

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data.data);
      })
      .catch((err) => {
        // some error
      });
  }, []);

  return (
    <div className="listings-page">
      <div className="listings-grid">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default Listings;
