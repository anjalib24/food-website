import React from 'react'
import { Header } from './Header'
import { Shopnow } from './Shopnow'
import { Bestsellers } from './Bestsellers'
import { Allproduct } from './Allproduct'
import { Aboutus } from './Aboutus'
import { Reviews } from './Reviews'
import { Faq } from './Faq'
import { Blog } from './Blog'
import { Footer } from './Footer'

export const Home = () => {
  return (
<>
<Header/>
<Shopnow/>
<Bestsellers/>
<Allproduct/>
<Aboutus/>
<Reviews/>
<Faq/>
<Footer/>
</>
    )
}
