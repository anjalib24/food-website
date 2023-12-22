import React, { useEffect, useState } from 'react'
import "./style.css"
import videos from "./images/Group.png"
import food from "./images/image 7.png"

export const Aboutus = (props) => {
    console.log(props?.video, "aboutus image");
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

                                {props?.aboutus?.text}
                            </h4>
                            {props?.aboutus?.video && (
                                <img alt="youtube_logo" src={videos} className="px-5" />
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img alt="food_image" src={food} className=" align-items-end" />
                    </div>
                </div>
            </section>
        </>
    )
}
