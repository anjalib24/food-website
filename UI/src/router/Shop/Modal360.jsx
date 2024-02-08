import React, { useEffect, useRef, useState } from 'react';
import WR360 from "@webrotate360/imagerotator";
import "@webrotate360/imagerotator/build/css/all.css";
import { useProductState } from './context/ProductContext';
import axios from 'axios';

const Modal360 = ({ data }) => {
    const { show360Modal, setShow360Modal } = useProductState();
    const viewerRef = useRef(null); 
  console.log(data?.product?._id,"idddddddddddddd");
  const [viewer, setViewer] = useState(null); // State to hold the viewer instance

  const fetchDataAndInitializeViewer = async () => {
      try {
          const response = await axios.get(import.meta.env.VITE_APP_BASE_API + `/api/v1/products/get-product-zifile/${data?.product?._id}`, {
              headers: {
                  "Content-Type": "application/json"
              },
              mode: 'cors'
          });

          const configFileURL = await import.meta.env.VITE_APP_BASE_API + response.data.data.zipFile?.xml_url
          const graphicsPath = await import.meta.env.VITE_APP_BASE_API + data?.zipFile?.image_url;

          const newViewer = WR360.ImageRotator.Create("webrotate360");
          newViewer.licenseCode = "your-license-code";
          newViewer.settings.configFileURL =configFileURL ;
          newViewer.settings.graphicsPath = graphicsPath;
          newViewer.settings.alt = "Your alt image description";
          newViewer.settings.responsiveBaseWidth = 800;
          newViewer.settings.responsiveMinHeight = 300;

          newViewer.settings.apiReadyCallback = (api, isFullScreen) => {
              api.images.onDrag((event) => {
                  console.log(
                      `${event.action}; current image index = ${api.images.getCurrentImageIndex()}`
                  );
              });
          };
          newViewer.runImageRotator();

          setViewer(newViewer); // Set the viewer instance in state
      } catch (error) {
          console.error('Error fetching product:', error);
      }
  };

  useEffect(() => {
      if (show360Modal) {
          fetchDataAndInitializeViewer();
      } else {
          // Dispose the viewer instance when modal is closed
          if (viewer) {
              viewer.dispose();
              setViewer(null); // Reset viewer state
          }
      }
  }, [show360Modal,data?.product?._id]);

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