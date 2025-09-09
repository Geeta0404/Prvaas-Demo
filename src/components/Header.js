import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
// import {  FaFacebookF, FaTwitter, FaYoutube, FaPhoneAlt, FaSearch, FaBars} from 'react-icons/fa';
import { FaSearch} from 'react-icons/fa';
import Logo from '../assets/logoP.webp';
import { NavLink, useNavigate } from "react-router-dom";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const userEmail = parsed.email;
        setUsername(userEmail?.split('@')[0]); // Show name part only
      } catch (e) {
        setUsername(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'VACATIONS', href: '#vacations' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'BLOG', href: '#blog' },
    { label: 'TESTIMONIALS', href: '#testimonials' },
    { label: 'TERMS', href: '#terms' },
    { label: 'AGENT LOGIN', href: '#agent' },
    { label: 'CONTACT US', href: '#contact' },
    { label: 'PRIVACY POLICY', href: '#privacy' },
  ];

  return (
    <>
          {/* Main Navbar */}
      <Navbar expand="lg" variant="dark" className="w-100 py-2" style={{ position: 'absolute', top: '10px', left: 0, zIndex: 1000, backgroundColor: 'transparent' }}>
        <Container className="d-flex justify-content-between align-items-center">
       
<div className="d-flex align-items-center gap-3">
            <Navbar.Brand href="/">
              <img src={Logo} alt="Traveler Logo" height="60" />
            </Navbar.Brand>
          </div>


          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto gap-4">
              <Nav.Link as={NavLink} to="/" className="text-uppercase fw-bold text-white">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="text-uppercase fw-bold text-white">About Us</Nav.Link>
              <Nav.Link as={NavLink} to="/destination" className="text-uppercase fw-bold text-white">Destination</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="text-uppercase fw-bold text-white">Contact</Nav.Link>

              {!username ? (
                <Nav.Link as={NavLink} to="/admin_panel/login" className="text-uppercase fw-bold text-white">
                  Login
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link className="text-uppercase fw-bold text-white">
                    Hi, {username}
                  </Nav.Link>
                  <Button variant="outline-light" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>



          <div className="d-flex align-items-center gap-3">

            
          <div className="d-flex align-items-center gap-3">
            <FaSearch className="text-white" style={{ cursor: 'pointer' }} />
            {/* <FaBars
              className="text-white"
              style={{ cursor: 'pointer', fontSize: '24px' }}
              onClick={toggleSidebar}
            /> */}
          </div>
           <Button
  variant="warning"
  className="rounded-pill px-4 fw-bold text-white text-decoration-none"
>
  Book Now
</Button>

            <div className={`fullscreen-menu ${isOpen ? 'open' : ''}`}>
              <button className="close-btn" onClick={toggleSidebar}>&times;</button>
              <ul className="menu-list">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} onClick={toggleSidebar}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
