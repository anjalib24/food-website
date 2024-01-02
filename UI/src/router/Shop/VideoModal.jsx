import React from 'react';

const VideoModal = ({ showModal, setShowModal, data , title }) => {
  const handleClose = () => {
    const video = document.getElementById('videoPlayer');
    video.pause();
    setShowModal(false);
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} id="videomodal" tabIndex="-1" role="dialog" aria-labelledby="explore360ModalLabel" aria-hidden={!showModal} data-backdrop="static" data-keyboard="false">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ height: "450px" }}>
          <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ height: "89%" }}>
            <video id="videoPlayer" controls width="100%" height="100%">
              <source src={"/api" + data?.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;