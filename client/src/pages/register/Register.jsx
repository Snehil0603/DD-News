import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';
import Login from '../login/Login';
import BookLoader from '../bookLoader/BookLoader'; // Import BookLoader

import './register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // State for loader visibility
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  useEffect(() => {
    // Timer to hide the loader after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after 3 seconds
    }, 3000);

    // Clear timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('http://localhost:5000/server/auth/register', {
        username,
        email,
        password,
      });
      if (res.status === 201 || res.status==200) {
        console.log(res.data);
        localStorage.setItem('userId', res.data._id);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data }); // Dispatch login success
        navigate('/landingPage'); // Navigate to landing page
      }
    } catch (err) {
      console.log(err);
      setError(true);
      dispatch({ type: 'LOGIN_FAILURE' }); // Dispatch login failure
    }
  };

  const containerNew = document.getElementById('containerNew');

  const handleClick2 = async (e) => {
  const containerNew = document.getElementById('containerNew');

    e.preventDefault();
    containerNew.classList.add('right-panel-active');
  };

  const handleClick1 = async (e) => {
  const containerNew = document.getElementById('containerNew');

    e.preventDefault();
    containerNew.classList.remove('right-panel-active');
  };

  if (loading) {
    return <BookLoader />; // Show the loader until the loading state is false
  }

  return (
    <>
      <div className="body">
        <div className="containerNew" id="containerNew">
          <div className="form-container sign-up-container">
            <form className="registerForm" onSubmit={handleSubmit}>
              <h1 className="h1">Create Account</h1>
              <label className="label">Username</label>
              <input
                type="text"
                className="registerInput input"
                placeholder="Enter your username..."
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="label">Email</label>
              <input
                type="text"
                className="registerInput input"
                placeholder="Enter your email..."
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="registerInput"
                placeholder="Enter your password..."
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="registerButton button" type="submit">
                Register
              </button>
              {error && <span className="errBtn">Something went wrong</span>}
            </form>
          </div>
          <Login />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="h1">Welcome Back!</h1>
                <p className="p1" style={{ marginTop: '10px', marginBottom: '10px' }}>
                  To keep connected with us please login with your personal info.
                </p>
                <button className="ghost button" id="signIn" onClick={handleClick1}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="h1">Hello, Friend!</h1>
                <p className="p">Enter your personal details and get updated with our latest news</p>
                <button className="ghost button" id="signUp" onClick={handleClick2}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
