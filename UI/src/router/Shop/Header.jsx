import React, { useEffect, useState } from 'react';
import "./style.css";
import ethnicLogo from './images/logo 2 2.png';
import { Button, Dropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom"; 
import defaultpersonimg from "./images/defaultperson.png"
import { HashLink as Link } from 'react-router-hash-link';

const Header = ({ hideCart , hidebutton }) => {
  const [basketCount, setBasketCount] = useState(0);
  const navigate = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState({defaultpersonimg}); 

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
    const itemCount = cart.length;
    setBasketCount(itemCount);
  }

  useEffect(() => {
    countCartItems();

    const handleStorageChange = () => {
      countCartItems();
    };

    window.addEventListener('cart', handleStorageChange);
    return () => {
      window.removeEventListener('cart', handleStorageChange);
    };
  }, []);

  return (
    <>
    <header>
        <div className="main-header">
          <div className="container">
            <nav>
              <Link to="/">
                <img src={ethnicLogo} className="logo" alt="#" />
              </Link>
              <ul>
             <li><Link to="/">Home</Link></li>
             <li><Link to="/shop">Shop</Link></li>
             <li><Link to="/#About">About Us</Link></li>
             <li><Link to="/#review">Review</Link></li>
             <li><Link to="/#Blog">Blog</Link></li>
             <li><Link to="/#FAQ">FAQ</Link></li>
             <li onClick={() => scrollToSection('footer')}>Contact</li>
           </ul>
              {!isLoggedIn && !hidebutton && (
                <div>
                  <Button style={{background:"green"}} onClick={() => navigate.push("/login")}>Login</Button>
                </div>
              )}
                 {!hideCart && (
          <div className="icons" onClick={handleBasketClick}>
            <i className="fa badge fa-lg" value={basketCount}>
              &#xf290;
            </i>
          </div>
        )}
              {isLoggedIn && (
                <Dropdown>
                  <Dropdown.Toggle as="div" id="dropdown-basic" style={{borderRadius: '40%', width: '40px', height: '40px'}}>
                    <img src={defaultpersonimg} alt="User Profile" className="profile-image" style={{width: '100%', height: '100%'}}/>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/yourprofile">Your Profile</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;