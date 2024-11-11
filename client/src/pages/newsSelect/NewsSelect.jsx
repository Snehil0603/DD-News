import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newsCSS.css';

const NewsSelect = () => {
  const navigate = useNavigate();
  
  // State to track selected channels
  const [selectedChannels, setSelectedChannels] = useState([]);

  // Array of channel data to easily manage and render channels
  const channels = [
    { id: 'Zee News', name: 'Zee News', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Zee_news.svg/1280px-Zee_news.svg.png' },
    { id: 'ABP News', name: 'ABP News', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/ABP_News_logo.svg/320px-ABP_News_logo.svg.png' },
    { id: 'Times Now', name: 'Times Now', logo: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Times_Now_2010.png' },
    { id: 'Aaj Tak', name: 'Aaj Tak', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Aaj_Tak_Logo.png' },
    { id: 'NDTV', name: 'NDTV', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/NDTV_logo.svg/1920px-NDTV_logo.svg.png' },
    { id: 'India TV', name: 'India TV', logo: 'https://upload.wikimedia.org/wikipedia/en/6/60/India_tv_logo-en.png' },
    { id: 'India Today', name: 'India Today', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/India_Today_logo.png' },
    { id: 'CNN', name: 'CNN', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/175px-CNN.svg.png' },
    { id: 'BBC', name: 'BBC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/BBC_Logo_2021.svg/1920px-BBC_Logo_2021.svg.png' },
  ];

  const handleBack = () => {
    navigate('/register');
  };

  const handleCheckboxChange = (id) => {
    setSelectedChannels((prevSelectedChannels) => {
      if (prevSelectedChannels.includes(id)) {
        // Uncheck: remove the id from the selected array
        return prevSelectedChannels.filter(channelId => channelId !== id);
      } else {
        // Check: add the id to the selected array
        return [...prevSelectedChannels, id];
      }
    });
  };


  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage");
      return; // Stop the function if userId is null
    }
    const userData = { selectedChannels };

    try {
      const response = await fetch(`http://localhost:5000/server/users/${userId}/updateChannels`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        navigate("/landingPage");
      } else {
        console.error("Failed to update user with selected channels");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="news-channel-container">
      <div className="header">
        <button onClick={handleBack} className="back-button">
          &#8592; {/* Left arrow icon */}
        </button>
        <h2>Select Your Favorite Channel</h2>
      </div>
      <ul className="checkbox-list">
        {channels.map((channel) => (
          <li key={channel.id}>
            <input
              type="checkbox"
              id={channel.id}
              checked={selectedChannels.includes(channel.id)}
              onChange={() => handleCheckboxChange(channel.id)}
            />
            <label htmlFor={channel.id} className='label'>
              <img src={channel.logo} alt={`${channel.name} Logo`} />
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="submit-button">Submit</button>
    </div>
  );
};

export default NewsSelect;
