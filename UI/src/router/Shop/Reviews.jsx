import React from 'react'
import "./style.css"
import person1 from "./images/image 28.png"
import person2 from "./images/image 28 (1).png"
import person3 from "./images/image 28 (2).png"

export const Reviews = () => {
  return (
<>
<section id="review" className="m-5 mb-5">
            <div className="col-md-12 m-4 text-center">
                <h1>Reviews</h1>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-3 ">
                        <div id="review_card">
                            <div id="card_top">
                                <div id="profile" className="">
                                    <div id="profile_image">
                                        <img src={person1} className=""/>
                                    </div>
                                    <div id="name" className="m-2">
                                        <strong>Stan Johnson</strong>
                                        <p>29 years</p>
                                        <div id="like" className=" text-warning">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div id="comment" className="m-2 ">
                                <p>
                                    EthnicFoods.com has been a delightful discovery! It's a treasure trove of culinary
                                    adventures from various cultures. The recipes are easy to follow, and the selection of
                                    ingredients is impressive. I've enjoyed exploring new flavors and dishes from around the
                                    world. Highly recommended.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div id="review_card">
                            <div id="card_top">
                                <div id="profile">
                                    <div id="profile_image">
                                        <img src={person2} className=""/>
                                    </div>
                                    <div id="name" className="m-2">
                                        <strong>Stan Johnson</strong>
                                        <p>29 years</p>
                                        <div id="like" className=" text-warning">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div id="comment" className="m-2 ">
                                <p>EthnicFoods.com has been a delightful discovery! It's a treasure trove of culinary
                                    adventures
                                    from various cultures. The recipes are easy to follow, and the selection of ingredients
                                    is
                                    impressive. I've enjoyed exploring new flavors and dishes from around the world. Highly
                                    recommended.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div id="review_card">
                            <div id="card_top">
                                <div id="profile">
                                    <div id="profile_image">
                                        <img src={person3} className=""/>
                                    </div>
                                    <div id="name" className="m-2">
                                        <strong>Stan Johnson</strong>
                                        <p>29 years</p>
                                        <div id="like" className=" text-warning">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div id="comment" className="m-2 ">
                                <p>EthnicFoods.com has been a delightful discovery! It's a treasure trove of culinary
                                    adventures
                                    from various cultures. The recipes are easy to follow, and the selection of ingredients
                                    is
                                    impressive. I've enjoyed exploring new flavors and dishes from around the world. Highly
                                    recommended.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div id="review_card">
                            <div id="card_top">
                                <div id="profile">
                                    <div id="profile_image">
                                        <img src={person2} className=""/>
                                    </div>
                                    <div id="name" className="m-2">
                                        <strong>Stan Johnson</strong>
                                        <p>29 years</p>
                                        <div id="like" className=" text-warning">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div id="comment" className="m-2 ">
                                <p>EthnicFoods.com has been a delightful discovery! It's a treasure trove of culinary
                                    adventures
                                    from various cultures. The recipes are easy to follow, and the selection of ingredients
                                    is
                                    impressive. I've enjoyed exploring new flavors and dishes from around the world. Highly
                                    recommended.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</>
  )
}
