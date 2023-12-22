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

export const Home = () => {
  const [show, setShow] = useState()
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getshowingdata("views/get-views");
        setShow(result.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, []);
  return (
    <>
      <Header />
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
