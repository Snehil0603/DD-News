import React, { useEffect, useState, useContext } from 'react';
import './FavoriteNewsPage.css';  // Import the CSS for styling
import { Context } from '../../context/Context';
import NewsDisplay from '../newsDisplay/NewsDisplay';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const FavoriteNewsPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(Context);

  useEffect(() => {
    // Make sure the user is logged in before fetching favorites
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  // Fetch the favorite news from the backend
  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:5000/server/favorite/getFavoredNews", {
        method: "POST", // Sending a POST request to fetch the favorites
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${localStorage.getItem("token")}`,  // Pass the token stored in localStorage
        },
        body: JSON.stringify({ userFrom: user._id }) // Send the logged-in user's ID (user._id)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // localStorage.setItem()
        setFavorites(data.favorites || []); // Set favorites, defaulting to an empty array if no data
      } else {
        throw new Error("Failed to fetch favorites");
      }
    } catch (err) {
      setError(err.message); // Set error message in case of failure
    } finally {
      setLoading(false); // Stop loading once request is complete
    }
  };

  return (
    <>
      <Navbar/>
      <div className="favorite-news">
        {/* Pass the favorites as articles to NewsDisplay component */}
        <NewsDisplay
          articles={favorites} 
          loading={loading} 
          error={error}
        />
      </div>
      <Footer/>
    </>
  );
};

export default FavoriteNewsPage;
