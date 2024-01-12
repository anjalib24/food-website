import React, { useEffect, useState } from 'react';
import "./style.css";
import ethnicLogo from './images/logo 2 2.png';
import { Button, Dropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import defaultpersonimg from "./images/defaultperson.png"
import { HashLink as Link } from 'react-router-hash-link';
import axios from 'axios';
import { useProductState } from './context/ProductContext';

const Header = ({ hideCart, hidebutton }) => {
  const navStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: 'white',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: '80px',
  };

  const navigate = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartCount } = useProductState()
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleBasketClick() {
    navigate.push("/cart");
  }

  function countCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  useEffect(() => {
    countCartItems();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.get('http://62.72.1.123:8000/api/v1/users/logout', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        localStorage.clear();
        setIsLoggedIn(false);
        navigate.push("/home");
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  }
  const scrollToBestseller = () => {
    const bestsellerSection = document.getElementById('bestsellers');
    if (bestsellerSection) {
      bestsellerSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <>
      <header>
        <div className="main-header">
          <div className="container">
          <nav style={navStyles}>
              <Link to="/">
                <img src={ethnicLogo} className="logo" alt="#" />
              </Link>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li onClick={() => scrollToBestseller()}><Link to="/shop">Shop</Link></li>
                <li><Link to="/#About">About Us</Link></li>
                <li><Link to="/#review">Review</Link></li>
                <li><Link to="/#Blog">Blog</Link></li>
                <li><Link to="/#FAQ">FAQS</Link></li>
                <li onClick={() => scrollToSection('footer')} style={{ cursor: "pointer" }}>Contact</li>
              </ul>
              <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'row', gap: '5px' }}>
                {!hideCart && (
                  <div className="icons" onClick={handleBasketClick}>
                    <i className="fa badge fa-lg"
                      value={cartCount}>
                      &#xf290;
                    </i>
                  </div>
                )}
                {!isLoggedIn && !hidebutton && (
                  <div>
                    <Button style={{ background: "green" }} onClick={() => navigate.push("/login")}>Login</Button>
                  </div>
                )}
                {isLoggedIn && (
                  <Dropdown>
                    <Dropdown.Toggle as="div" style={{ borderRadius: '40%', width: '40px', height: '40px' }}>
                      <img src={defaultpersonimg} alt="User Profile" className="profile-image" style={{ width: '80%', height: '80%' }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu show={false}>
                      <Dropdown.Item as={Link} to="/yourprofile">Your Profile</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
              <div className="hambagarmenu" style={{ fontSize: "30px" }}>
                <i className="fa-solid fa-bars dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" ><Link to="/">Home</Link></a>
                  <a className="dropdown-item" href="#"><Link to="/shop">Shop</Link></a>
                  <a className="dropdown-item" ><Link to="/#About">About Us</Link></a>
                  <a className="dropdown-item" href="#"><Link to="/#review">Review</Link></a>
                  <a className="dropdown-item" href="#"><Link to="/#Blog">Blog</Link></a>
                  <a className="dropdown-item" href="#"><Link to="/#FAQ">FAQ</Link></a>
                  <a className="dropdown-item" onClick={() => scrollToSection('footer')} style={{ cursor: "pointer" }}>Contact</a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;