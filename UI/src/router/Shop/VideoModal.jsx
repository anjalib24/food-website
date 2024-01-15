import React from 'react';
import { useProductState } from './context/ProductContext';

const VideoModal = ({data , title }) => {
  const {showvideomodal , setShowvideomodal} = useProductState()
  const handleClose = () => {
    const video = document.getElementById('videoPlayer');
    video.pause();
    setShowvideomodal(false);
  };
  return (
    <div className={`modal fade ${showvideomodal ? 'show' : ''}`} id="videomodal" tabIndex="-1" role="dialog" aria-labelledby="explore360ModalLabel" aria-hidden={!showvideomodal} data-backdrop="static" data-keyboard="false">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ height: "450px" }}>
          <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ height: "89%" }}>
            <video id="videoPlayer" controls width="100%" height="100%" style={{ maxHeight:"360px",minHeight:"330px"}}>
              <source src={import.meta.env.VITE_APP_BASE_API+data?.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;