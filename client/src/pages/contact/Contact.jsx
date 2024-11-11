import React, { useState } from 'react';
import './contact.css';
import Navbar from '../navbar/Navbar';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <>
    <Navbar/>
    <div className="contact-form-container">
      <div className="form-content">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="4"
            required
          ></textarea>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      <div className="form-image">
        <img src="/assests/8182904.jpg" alt="Contact Us" />
      </div>
    </div>
    </>
  );
};

export default ContactForm;
