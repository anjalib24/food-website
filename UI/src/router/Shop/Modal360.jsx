import React, { useState } from 'react';
import WR360 from "@webrotate360/imagerotator";
import "@webrotate360/imagerotator/build/css/all.css";
import { useEffect } from "react";

const Modal360 = ({ show360Modal, setShow360Modal, data }) => {

console.log(show360Modal,"modal 360 showmoda;");
    useEffect(() => {

        console.log("useeffect run");
        const viewer = WR360.ImageRotator.Create("webrotate360");
        viewer.licenseCode = "your-license-code";
        viewer.settings.configFileURL = "http://localhost:8000/zipfiles/example_1703078272760/example/example.xml"
        viewer.settings.graphicsPath = "http://localhost:8000/zipfiles/example_1703078272760/example/images";

        viewer.settings.alt = "Your alt image description";
        viewer.settings.responsiveBaseWidth = 800;
        viewer.settings.responsiveMinHeight = 300;

        viewer.settings.apiReadyCallback = (api, isFullScreen) => {
            api.images.onDrag((event) => {
                console.log(
                    `${event.action
                    }; current image index = ${api.images.getCurrentImageIndex()}`
                );
            });
        };

        viewer.runImageRotator();
    },[show360Modal]);
    return (
        <div className={`modal fade ${show360Modal ? 'show' : ''}`} id="explore360Modal" tabIndex="-1" role="dialog" aria-labelledby="explore360ModalLabel" aria-hidden={!show360Modal}>

            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{minHeight:"400px"}}>
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">360 view of product</h5>

                        <button type="button" className="close" data-dismiss="modal" onClick={() => setShow360Modal(false)} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body">
                        <div id="webrotate360"></div>;

                    </div>


                </div>
            </div>
        </div>
    );
};

export default Modal360;
