import React, { useEffect, useState } from 'react'
import "./Productdetailpage.css"
import { useLocation } from "react-router-dom";
import Header from './Header';
import { Button, Stack } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { useProductState } from './context/ProductContext';
import { useParams } from 'react-router-dom';
import Alert from './Alert';
import { Footer } from './Footer';
import { Container, Row, Col } from 'react-bootstrap';
import { Rating } from '@mui/material';
import defaultpersonimg from "./images/defaultperson.png"
import Loader from '@/components/Loader';
import axios from 'axios';

const Productdetailpage = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const { handleaddtocard, showAlert, setShowAlert, alertmsg } = useProductState();
  const { id } = useParams();
  const {createMarkup } = useProductState();

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
    setIsLoading(true); 
    const fetchProduct = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_APP_BASE_API+`/api/v1/products/get-single-product/${id}`, {
           headers: {
             "Content-Type": "application/json"
           },
           mode: 'cors'
        });
        setProduct(response.data.data);
       } catch (error) {
        console.error('Error fetching product:', error);
       }finally {
         setIsLoading(false); 
      }
     };
    fetchProduct();
  }, [id]);

  return (
    <>
     {isLoading && <Loader />}
      <Header />
      {showAlert && <Alert type="success" message={alertmsg} />}
      <Container className='mt-5'>
        <Row>
          <Col xs={12} md={2} style={{ marginTop: "20px" }}>
            <div className="image-list d-flex align-items-center">
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
                style={{ height:"100px"}}
                  onMouseOver={() => {
                    setSelectedImage(product.video_url);
                    setIsVideo(true);
                  }}
                >
                  <source src={import.meta.env.VITE_APP_BASE_API+product.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </Col>
          <Col xs={12} md={5} style={{ marginTop: "20px" }}>
            <div className="large-image">
              {isVideo ? (
                <video width="500" height="500" controls autoPlay>
                  <source src={import.meta.env.VITE_APP_BASE_API+selectedImage} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={import.meta.env.VITE_APP_BASE_API+selectedImage} alt="" />
              )}
            </div>
          </Col>
          <Col xs={12} md={5} style={{ marginTop: "20px" }}>
            <div className="product-details">
              <h2>{product?.title}</h2>
              <div className="product-reviews" >
                <h5>Rating</h5>
                <Stack spacing={1}>
                  <Rating name="half-rating-read" defaultValue={product?.rating} precision={0.5} readOnly />
                </Stack>
                <p>This product is great!</p>
              </div>
              <div>
                <p>Price: <h3>{formatter.format(product?.price)}</h3> </p>
              </div>
              <p dangerouslySetInnerHTML={createMarkup(product?.description)}></p>
            
              <Button style={{ backgroundColor: 'green' }}
                onClick={() => handleaddtocard(product)}
              >Add to cart</Button>
              <div>
                <div style={{marginTop:"10px"}}>
                  <h5>
                    Reviews
                  </h5>

                </div>
                <div style={{marginTop:"30px"}}>

                {product?.reviews?.length > 0 ? (
            product.reviews.map((item) => (
<>
                          <div className="row" style={{ display: "flex", flexDirection: "column", margin:"auto"  , marginTop:"10px"}}  >
                            <div className="col-md-4 " style={{ display: "flex" , gap:"10px" }}>
                              <div>
                                <img alt="Sample Image" style={{ maxHeight: "35px", width: "auto" }} src={defaultpersonimg} />

                              </div>
                              <div>
                                {item.username}
                              </div>
                            </div>
                            <div className="col-md-12 " style={{marginLeft:"30px"}}>
                              {item.comment}
                            </div>
                            <div className="col-md-2" style={{marginLeft:"30px"}}>
                              <Stack spacing={1}>
                                <Rating name="half-rating-read" defaultValue={item?.rating} precision={0.5} readOnly />
                              </Stack>
                            </div>
                            </div>
                         </>
              ))
          ) : (
            <p>There are no reviews available for this product.</p>
          )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
export default Productdetailpage
