import React, { useEffect, useRef, useState } from 'react'
import "./style.css"
import { fetchData } from './services/Api'
import ProductCard from './ProductCard';
import Slider from 'react-slick';
import Loader from '@/components/Loader';
import axios from 'axios';


const BestSellers = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);



  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_APP_BASE_API + "/api/v1/products/get-best-seller-product",
          
          { mode: 'cors' }
        );
        const bestSellers = response.data.data
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
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: true,  // Enable swipe
  draggable: true,  // Enable drag
  swipeToSlide: true,  // Enable swipe to any slide

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
          dots:true,
          arrows:false
        },
      },
    ],
  };

  return (
    <>
      <div className="container" id='bestsellers'>
        <section id="search" className="mt-5">
          <div className="col-md-12 mt-5 mb-5 text-center">
            <h1>Bestsellers</h1>
          </div>
          <div className="row">
            {loading ? (
              <div className="col-md-12 text-center">
                <Loader />
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
