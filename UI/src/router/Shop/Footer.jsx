import React from 'react'
import footerlogo from "./images/EthnicFoods-Footer Logo.png"
export const Footer = () => {
  return (
<>
<section id="footer" className="mt-5">
            <footer className="bg-success text-white pt-5 pb-4 pe-3">
                <div className="container text-left text-md-left">
                    <div className="row text-left text-md-left">
                        <div className="col-md-9">
                            <h3>Contect</h3>
                            <p className="">+1 617 817 2625</p>
                            <p className="">contact@ethnicfoods.com</p>
                            <p className="">5919 Trussville Crossings Pkwy, Birmingham</p>
                            <img src={footerlogo} className="" alt="" width="211px"/>
                            <p className="pt-5"> &copy;Copyright 2023. All Rights Reserved by Ethnic Foods Market LLC</p>
                        </div>
                        <div className="col-md-3">
                            <h3>Explore</h3>
                            <p className=" justify-content-center">About Us</p>
                            <p className=" justify-content-center">Meet Our Team</p>
                            <p className="justify-content-center">Terms</p>
                            <p className=" justify-content-center">Privacy Policy</p>
                            <p className= "justify-content-center">Free Shipping</p>
                            <p className=" justify-content-center">Contact</p>

                        </div>

                    </div>
                </div>
            </footer>
        </section>
</> 
 )
}
