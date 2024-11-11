import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footerr">
      <div className="footer-socials">
        <a href="" className="social-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="" className="social-icon">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="" className="social-icon">
          <i className="fab fa-google"></i>
        </a>
        <a href="" className="social-icon">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="" className="social-icon">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="" className="social-icon">
          <i className="fab fa-github"></i>
        </a>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <h6 className="footer-title">Daily Dose</h6>
          <p>The most trusted news channel of India which provides reliable news 24X7.</p>
        </div>

        <div className="footer-section">
          <h6 className="footer-title">Subscriptions</h6>
          <ul className='ul-list'>
            <li><a href="https://news-letter-101.vercel.app/" className="footer-link">Daily</a></li>
            <li><a href="https://news-letter-101.vercel.app/" className="footer-link">Monthly</a></li>
            <li><a href="https://news-letter-101.vercel.app/" className="footer-link">Yearly</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h6 className="footer-title">Useful Links</h6>
          <ul className='ul-list'>
            <li><a href="/about" className="footer-link">About us</a></li>
            <li><a href="/favorites" className="footer-link">Favorites</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
            <li><a href="#" className="footer-link">Profile</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h6 className="footer-title">Contact</h6>
          <p><i className="fas fa-home"></i> Lucknow, LKW 10012, IN</p>
          <p><i className="fas fa-envelope"></i> dd@news.com</p>
          <p><i className="fas fa-phone"></i> +91 234 567 88</p>
          <p><i className="fas fa-print"></i> +91 234 567 89</p>
        </div>
        <div className="footer-section">
          <img src="/assests/img-logo-removebg-preview.png" alt="LOGO"/>
        </div>
      </div>

      

      <div className="footer-bottom">
        <p>© 2022 Copyright: <a href="#" className="footer-link">DDNews.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
