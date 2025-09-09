// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.jpg';

const Headerr = () => {
  const [activeNav, setActiveNav] = useState('');
  const [location, setLocation] = useState(null);
  const currentLocation = useLocation();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    setActiveNav(currentLocation.pathname);
  }, [currentLocation.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Treatment', path: '/treatment' },
    // { name: 'Testimonials', path: '/testimonials' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-dark text-light text-center pt-2">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          {/* Left Column - Social Icons */}
          <div className="d-flex gap-3 mb-0 mb-md-0">
          <a href="https://www.facebook.com/dradityaperfectsmiledentalclinic/" className="text-light" target='_blank'><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-light"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-light"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-light"><i className="fab fa-linkedin-in"></i></a>
          </div>

          {/* Right Column - Contact Info */}
          <div className="text-sm text-md-end">
            <p>
              Clinic No.: +91 9923543003 | Contact Dr. Aditya: +91-9607351425 |
              <a href="mailto:drpriyank@smilekraftdentistry.com" className="text-white" style={{textDecoration:"none"}}>  dradityamjadhav@gmail.com </a>
            </p>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="/Perfect_Dental">
            <img src={logo} alt="Perfect Dental" height="50" />
          </a>

          {/* Hamburger Menu for mobile */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <li key={item.name} className="nav-item">
                  <Link 
                    to={item.path} 
                    className={`nav-link ${activeNav === item.path ? 'active-link' : ''}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Headerr;
