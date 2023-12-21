import React from 'react'
import "./style.css"
import basket from './images/Basket.png';
import ethnicLogo from './images/logo 2 2.png'


export const Header = () => {
    function scrollToSection(sectionId) {
        console.log("working------")
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
  return (
    
    <>
    <header>
        <div className="main-header">
            <div className="container">
                <nav>
                    <a href="/"><img src={ethnicLogo} className="logo" alt="#"/></a>
                    
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">Shop</a></li>
                            <li><a onClick={() => scrollToSection('About')}>About Us</a></li>
                            <li><a href="#review">Review</a></li>
                            <li><a href="#Blog">Blog</a></li>
                            <li><a href="#FAQ">FAQ</a></li>
                            <li onClick={() => scrollToSection('footer')}>Contact</li>
                        </ul>
                    
                    <div className="icons">
                        <img alt='Basket' src={basket}/>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    </>
  )
}