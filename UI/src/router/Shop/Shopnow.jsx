import React from 'react'
import "./style.css"

export const Shopnow = () => {
  return (
<>
<section className="banner">
        <div className="row mt-5">
            <div className="col-md-12 text-dark justify-content-center text-center mt-3">
                <h1 className="text-center text-dark text-lg mt-5 mb-3">Shop A World<br/> <span>of Ethnic Foods</span></h1>
                <h6>Free Shiping Above 200 USD</h6>
                <p>Delivery in<strong> USA </strong>only</p>
                <div className="d-grid gap-2 align-items-center">
                    <button id="Shopbtn" className="btn btn-success ms-auto">Shop Now</button>
                </div>
            </div>
        </div>
    </section>
</>
  )
}
