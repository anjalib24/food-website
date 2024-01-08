import React, { useEffect, useState } from 'react'
import BestSellers from './BestSellers'
import Header from './Header'
import { Shopnow } from './Shopnow'
import { Allproduct } from './Allproduct'
import { Aboutus } from './Aboutus'
import { Faq } from './Faq'
import { Blog } from './Blog'
import { Footer } from './Footer'
import { getshowingdata } from './services/Api'
import Reviews from './Reviews'
import axios from 'axios'
import { useProductState } from './context/ProductContext'

export const Home = () => {
  const [show, setShow] = useState()
  const token = localStorage.getItem('token');
const {setCartCount} = useProductState()
  useEffect(() => {
    fetchDataFromApi();
    getcart();
  }, []);
  const fetchDataFromApi = async () => {
    try {
      const result = await getshowingdata("views/get-views");
      setShow(result.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error); 
    }
  };

  const getcart = async () =>{
    const response = await axios.get('/api/api/v1/products/get-cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setCartCount(response?.data?.data?.items.length)

  }

  if(!token){
    const cart = JSON.parse(localStorage.getItem('cart'));
    setCartCount(cart?.length || 0)
  }
  
  return (
    <>
      <Header/>
      <Shopnow herosection={show?.hero_section} />
      <BestSellers />
      <Allproduct />
      <Aboutus aboutus={show?.about_us} />
      <Reviews reviews={show?.reviews} />
      <Blog blog={show?.blog} />
      <Faq reviews={show?.faq} />
      <Footer />
    </>
  )
}
