import React, { useEffect, useState } from 'react';
import "./style.css";
import ethnicLogo from './images/logo 2 2.png';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const Header = () => {
  const [basketCount, setBasketCount] = useState(0);
  const navigate = useHistory();

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
    console.log("header useeffect run");
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
              <a>
                <img src={ethnicLogo} className="logo" alt="#" />
              </a>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#shop">Shop</a></li>
                <li><a href="#about" onClick={() => scrollToSection('About')}>About Us</a></li>
                <li><a href="#review">Review</a></li>
                <li><a href="#Blog">Blog</a></li>
                <li><a href="#FAQ">FAQ</a></li>
                <li onClick={() => scrollToSection('footer')}>Contact</li>
              </ul>
              <div>
                <Button style={{background:"green"}} onClick={() => navigate.push("/login")}>Login</Button>
              </div>
              <div className="icons" onClick={handleBasketClick}>
                <i className="fa badge fa-lg" value={basketCount}>
                  &#xf290;
                </i>
                <div>
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
