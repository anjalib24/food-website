import React from 'react'
import "./style.css"
import food from "./images/Group.png"
import videos from "./images/image 7.png"

export const Aboutus = () => {
  return (
<>
<section id="About">
            <div className="col-md-12 mt-5 mb-5 text-center">
                <h1>About us</h1>
            </div>
            <div className="row">
                <div className="col-md-6 mt-5">
                    <div className="about-text">
                    <h4 className=" m-5 justify-content-center">
                        <strong>Ethnic food </strong> is a world of flavors, a celebration of cultural traditions on
                        your
                        plate. It's the
                        taste of diverse cuisines, offering unique spices, ingredients, and cooking methods from around
                        the glob.
                    </h4>
                    <h4 className="m-5 justify-content-center">At <strong className="text-success"><span> EthnicFoods.com
                            </span></strong>, we bring you the most
                        interesting, popular and adventurous foodsfrom around
                        the World - from East to West,North to South of our great wonderful wide world!
                    </h4>
                    <img alt="food_image" src={food} className="px-5 "/>
                </div>
                </div>
                <div className="col-md-6">
                    <img alt="youtube_logo"src={videos} className=" align-items-end"/>
                </div>
            </div>
        </section>
</>
  )
}
