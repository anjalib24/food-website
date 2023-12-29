import React from 'react'
import productimg from "./images/image 5 (1).png"
import png360 from "./images/360.png"
import usflag from "./images/USA_Flag_icon.png"
import vectorimg from "./images/Vector.png"

const ProductCard = (props) => {
  const { item } = props
  const { description, price, title } = item
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <>
      <div style={{
        marginRight: '5px',
        marginLeft: "5px"
      }}>

        <div className="mb-4 border border-success card-container">
          <div className="d-flex mx-auto h-100">
            <div>
              <img src={productimg} className="text-center" alt="#" />
              <div className="card-content mx-2">
                <h3 className=" mt-3 clamp-2">{title}</h3>
                <p className="description clamp-2">{description}</p>

                <div className='d-flex flex-row align-items-center'>
                  <div className="mr-2">
                    <h5>Origin County:</h5>
                  </div>
                  <img src={usflag} alt="#" className='my-auto' />
                </div>

                <div className='d-flex flex-row'>
                  <a href="/" className="mr-3"><img src={png360} alt="png360" /></a>
                  <a href="/" className="mr-3"><img alt='vector' src={vectorimg} /></a>
                </div>
              </div>

            </div>
            <div className="flex-grow-1 d-flex flex-column justify-content-between">
              <div>
                <h3 className="text-center">{formatter.format(item.price)}</h3>
              </div>
              <div className="d-flex flex-col mx-2">
                <button className="btn btn-success btn-block ">Add to Cart</button>
                <button className="btn btn-white btn-block border border-success mb-1 ">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard