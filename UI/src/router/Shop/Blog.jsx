import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import blogimg from "./images/image 9.png";

export const Blog = (props) => {
   const slickRef = useRef(null);

  useEffect(() => {
    const slickInstance = slickRef.current;

    slickInstance.slickGoTo(0); 

    return () => {
      
      slickInstance.slickGoTo(0); 
      slickInstance.slickPause(); 
    };
  }, [props.blog]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
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
      <section id="Blog" className="mb-5">
        <div className="col-md-12 m-4 text-center">
          <h1>Blog</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div id="blog_main">
                <Slider ref={slickRef} {...settings}>
                  {props?.blog?.map((blogItem, index) => (
                    <div key={index} className="single-box">
                      <div className="img-area">
                        <img src={"/api"+blogItem.image} alt="" />
                      </div>
                      <div className="">
                        <p>{blogItem.createdAt}</p>
                        <h6 className='text-break'>{blogItem.content}</h6>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
