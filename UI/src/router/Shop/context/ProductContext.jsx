import axios from "axios";
import DOMPurify from "dompurify";
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();



export const ProductContexts = ({ children }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertmsg, setAlertMsg] = useState()
  const [showcard, setShowCard] = useState(false)
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [show360Modal, setShow360Modal] = useState(false);
  const [productId, setProductId] = useState(null)
  const [showsocial, setShowSocial] = useState(false)
  const [showvideomodal, setShowvideomodal] = useState(null);
  const [videodata, setVideoData] = useState()
  const [loading, setLoading] = useState(true);


  const handleaddtocard = async (item) => {
    console.log("add to cart workkk-----");
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products/get-cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const cartItems = response?.data?.data?.items;
        const isItemInCart = cartItems?.some(cartItem => cartItem.productId === item._id);
        if (isItemInCart) {
          setAlertMsg('Item is already in the cart');
          setShowAlert(true);
          setTimeout(() => {
            setAlertMsg("");
            setShowAlert(false);
          }, 3000);
        } else {
          const response = await axios.post('http://127.0.0.1:8000/api/v1/products/add-to-cart', [{
            productId: item._id,
            quantity: 1,
          }], {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setAlertMsg("Product added to the cart");
          setShowAlert(true);
          setTimeout(() => {
            setAlertMsg("");
            setShowAlert(false);
          }, 3000);
        }
      } else {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const isItemInCart = existingCart.some((cartItem) => cartItem._id === item._id);
        if (!isItemInCart) {
          const newCart = [...existingCart, item];
          localStorage.setItem('cart', JSON.stringify(newCart));
          localStorage.setItem('CartType', JSON.stringify("WithoutLogin"));
          setCart(newCart);
          setShowCard(true);
          setAlertMsg("Product added to the cart")
          setShowAlert(true);
          setTimeout(() => {
            setAlertMsg("")
            setShowAlert(false);
          }, 3000);
        } else {
          setAlertMsg('Item is already in the cart');
          setShowAlert(true)
          setTimeout(() => {
            setAlertMsg("")
            setShowAlert(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error handling add to cart:', error);
    }

  };
  const createMarkup = (htmlContent) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };
  const handleExploreClicks = (item) => {
    setSelectedItem(item);
    setShow360Modal(true);
  };
  const handleSocialmedia = (item) => {
    setProductId(item._id)
    setShowSocial(true);
  };
  const handleVideomodal = (item) => {
    setVideoData(item);
    setShowvideomodal(true);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ProductContext.Provider
      value={{ setLoading, loading ,handleaddtocard, showAlert, setShowAlert, alertmsg, setAlertMsg, showcard, setShowCard, cart, setCart, createMarkup, handleExploreClicks, handleSocialmedia, handleVideomodal, setSelectedItem, selectedItem, setShow360Modal, show360Modal , setProductId,productId , setShowSocial , showsocial , setVideoData , videodata, showvideomodal ,setShowvideomodal}}>


      {children}
    </ProductContext.Provider>
  );
};

export const useProductState = () => useContext(ProductContext);