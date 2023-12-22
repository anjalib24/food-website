import React, { useEffect, useRef, useState } from 'react'
import "./style.css"
import { fetchData } from './services/Api'
import ProductCard from './ProductCard';
import Slider from 'react-slick';

const BestSellers = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData("products/get-product");
        const bestSellers = result.data.docs.filter(product => product.best_seller === true);
        setData(bestSellers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDataFromApi();
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="container">
        <section className="bestselling">
          <div className="col-md-12 mt-5 mb-5 text-center">
            <h1>Bestsellers</h1>
          </div>
          <div className="row">
            {loading ? ( 
              <div className="col-md-12 text-center">
                <p>Loading...</p>
              </div>
            ) : data && data.length ?
              (
                <div className='container'>
                  
                  <Slider ref={sliderRef} {...settings} className='d-flex'>
                    {data.map((item, key) => {
                      return <ProductCard key={key} item={item} />
                    })}
                  </Slider>
                </div>
              ) : (
                <div className="col-md-12 text-center">
                  <p>No products available at the moment.</p>
                </div>
              )}
          </div>
        </section>
      </div>
    </>
  )
}
export default BestSellers
