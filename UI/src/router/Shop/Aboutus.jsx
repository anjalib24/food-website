import React, { useEffect, useState } from 'react'
import "./style.css"
import videos from "./images/Group.png"
import food from "./images/image 7.png"
import DOMPurify from "dompurify";
import VideoModal from './VideoModal';

export const Aboutus = (props) => {

    const [showvideomodal,setShowvideomodal]=useState(null);
    const [videodata,setVideoData] = useState()

    const handleVideomodal = (item) => {
        setVideoData(item);
        setShowvideomodal(true);
      };
    const createMarkup = (htmlContent) => {
        return { __html: DOMPurify.sanitize(htmlContent) };
    };
    return (
        <>
        {showvideomodal && <VideoModal showModal={showvideomodal} setShowModal={setShowvideomodal} data={videodata}/>}

            <section id="About">
                <div className="col-md-12 mt-5 mb-5 text-center">
                    <h1>About us</h1>
                </div>
                <div className="row">
                    <div className="col-md-6 mt-5">
                        <div className="about-text">
                            <div className=" m-5 justify-content-center" dangerouslySetInnerHTML={createMarkup(props?.aboutus?.text)}
                            >


                            </div>
                            {props?.aboutus?.video && (
                                <img alt="youtube_logo" src={videos} className="px-5"
                                
                                onClick={() => handleVideomodal(props?.aboutus?.video)}
                                data-toggle="modal"
                                data-target="#videomodal"
                                />
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
