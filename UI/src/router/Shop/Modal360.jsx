import React, { useEffect, useRef } from 'react';
import WR360 from "@webrotate360/imagerotator";
import "@webrotate360/imagerotator/build/css/all.css";
import { useProductState } from './context/ProductContext';
import axios from 'axios';

const Modal360 = ({ data }) => {
    const { show360Modal, setShow360Modal } = useProductState();
    const viewerRef = useRef(null); 
  console.log(data?.product?._id,"idddddddddddddd");
    useEffect(() => {
        const apiss = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_BASE_API + `/api/v1/products/get-product-zifile/${data?.product?._id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    mode: 'cors'
                });
              
                const viewer = WR360.ImageRotator.Create("webrotate360");
                viewer.licenseCode = "your-license-code";
                viewer.settings.configFileURL = await import.meta.env.VITE_APP_BASE_API + response.data.data.zipFile?.xml_url;
                viewer.settings.graphicsPath = await import.meta.env.VITE_APP_BASE_API + data?.zipFile?.image_url;
                viewer.settings.alt = "Your alt image description";
                viewer.settings.responsiveBaseWidth = 800;
                viewer.settings.responsiveMinHeight = 300;

                viewer.settings.apiReadyCallback = (api, isFullScreen) => {
                    this.viewerApi = api;
                    this.viewerApi.hotspots.onAction(hotspotConfig => {
                        console.log(JSON.stringify(hotspotConfig, null, 4));
                        return false; // Returning false indicates that you don't want to override a default hotspot action.
                    });
                }
                viewer.runImageRotator();
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                // setProductLoad(false);
            }
        }
        apiss()
       
    }, [show360Modal]);

    const handleClose = () => {
        // Remove modal backdrop
        document.body.classList.remove('modal-open');
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
        while (modalBackdrops[0]) {
            document.body.removeChild(modalBackdrops[0]);
        }
    
        // Manually remove the viewer's DOM element
        const viewerElement = document.getElementById('webrotate360');
        if (viewerElement && viewerElement.parentNode) {
            viewerElement.parentNode.removeChild(viewerElement);
        }
    
        // Clear any event listeners and other cleanup tasks associated with the viewer instance
        // For example, if you have event listeners, remove them here
    
        // Reset the viewer settings
        if (viewerRef.current) {
            viewerRef.current.destroy(); // Assuming there's a destroy method to properly clean up the viewer instance
            viewerRef.current = null;
        }
    
        setShow360Modal(false);
    };
    
    return (
        <div className={`modal fade ${show360Modal ? 'show' : ''}`} id="explore360Modal" tabIndex="-1" role="dialog" aria-labelledby="exploreModalLabel" aria-hidden={!show360Modal} data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{ minHeight: "400px" }}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">360 view of product</h5>
                        <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div id="webrotate360"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal360;