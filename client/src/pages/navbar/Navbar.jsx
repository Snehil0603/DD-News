import React, { useState, useContext } from 'react';
import { Logout } from '../../context/Action';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMobileMenuToggle = () => {
    setIsMobile(!isMobile);
  };

  const { user, dispatch } = useContext(Context);  // Get user and dispatch from context
  const navigate = useNavigate();  // useNavigate hook to navigate programmatically

  // Function to handle logout
  const handleLogout = () => {
    Logout(dispatch);  // Dispatch logout action
    navigate("/register");  // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/landingPage"><img src="/assests/img-logo.jpeg" alt="Logo" className='img'/></a>
      </div>
      <div className={`nav-links ${isMobile ? 'nav-links-mobile' : ''}`}>
        <a href="/contact">Contact</a>
        <a href="/about">About Us</a>
        <a href="/favorite">Favorites</a>
        <div className="profile-dropdown" style={{display:'contents'}}>
        <a href="/register" onClick={handleLogout}>
        <FaSignOutAlt  style={{fontSize:'25px'}}   onClick={handleDropdownToggle}        />

          </a>
        </div>
      </div>
      <div className="hamburger" onClick={handleMobileMenuToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
