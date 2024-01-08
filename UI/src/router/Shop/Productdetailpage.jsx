import React, { useEffect, useState } from 'react'
import "./Productdetailpage.css"
import { useLocation } from "react-router-dom";
import Header from './Header';
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player'; // Import ReactPlayer
import { useProductState } from './context/ProductContext';
import { useParams } from 'react-router-dom';
import Alert from './Alert';
import { Footer } from './Footer';


const Productdetailpage = () => {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const { handleaddtocard, showAlert, setShowAlert, alertmsg, setAlertMsg, showcard, setShowCard, cart, setCart } = useProductState();
  const { id } = useParams();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const youtubeLink = "https://www.youtube.com/watch?v=sSKhdZ32YpY"

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
      setIsVideo(false);
    }
  }, [product]);

  useEffect(() => {

 

    const fetchProduct = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/products/get-single-product/${id}`);
      const data = await response.json();
      setProduct(data.data);
    };

    fetchProduct();
  }, []);

  return (
    <>
      <Header />
      {showAlert && <Alert type="success" message={alertmsg} />}
      <div className="container">
        <div className="product-detail-flex-container">
          <div className="image-section">
            <div className="image-list">
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={"/api" + image}
                  alt=""
                  onMouseOver={() => {
                    setSelectedImage(image);
                    setIsVideo(false);
                  }}
                />
              ))}
              {product?.video_url && (
                <video width="100" height="100"
                  onMouseOver={() => {
                    setSelectedImage(product.video_url);
                    setIsVideo(true);
                  }}
                >
                  <source src={"/api" + product.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div className="large-image">
              {isVideo ? (
                <video width="500" height="500" controls autoPlay>
                  <source src={"/api" + selectedImage} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={"/api" + selectedImage} alt="" />
              )}
            </div>
          </div>
          <div className="product-details">
            <h2>{product?.title}</h2>
            <div className="product-reviews">
              <h5>Reviews</h5>
              <p>This product is great!</p>
            </div>
            <div>
              <p>Price: <h3>{formatter.format(product?.price)}</h3> </p>
            </div>
            <p>{product?.description}</p>
            <Button style={{ backgroundColor: 'green' }}
                                    onClick={() => handleaddtocard(product)}

            >Add to cart</Button> {/* Add this line */}
          </div>
        </div>
        <div className="youtube-preview">
            <ReactPlayer url={youtubeLink} controls={true} width='480px' height='270px' />
          </div>

      </div>
      <Footer/>
    </>
  )
}

export default Productdetailpage