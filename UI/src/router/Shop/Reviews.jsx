import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

 const Reviews = (props) => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  useEffect(() => {
    setIndex(0);
  }, [props.reviews]);

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

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <section id="review" className="m-5 mb-5">
        <div className="col-md-12 m-4 text-center">
          <h1>Reviews</h1>
        </div>
        <div className="container">


          <Slider
            {...settings}
            ref={sliderRef}
            beforeChange={(oldIndex, newIndex) => handleSelect(newIndex)}
          >

            {props?.reviews?.map((item, reviewIndex) => (
              <>
                 <div key={reviewIndex}  style={{
                  marginRight: '10px'
                }}>
                <div id="review_card">
                  <div id="card_top" >
                    <div id="profile" className="">
                      <div id="profile_image">
                        <img src={`/api${item.image}`} alt="Item" />
                      </div>
                      <div id="name" className="m-2">
                        <div>
                        <strong>{item.name}</strong>
                        <p>29 years</p>
                        </div>
                        
                        <div id="like" className=" text-warning">
                          {Array.from({ length: parseInt(item.rating, 10) }, (_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                          ))}
                          <i className="fa-solid fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="comment" className="m-2 overflow-auto" style={{height:"330px"}}>
                    <p>{item.reviews}</p>
                  </div>
                </div>
                </div>

              </>

            ))}

          </Slider>
        </div>
      </section>
    </>
  );
};

export default Reviews;

