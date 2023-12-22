import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';


const Modal360 = ({ show360Modal, setShow360Modal, data }) => {
  
    const [currentImage, setCurrentImage] = useState(1);
    const containerRef = useRef(null);
    const startXRef = useRef(0);
  
    useEffect(() => {
      const num = 36;
  
      for (let i = 1; i <= num; i++) {
        const img = document.createElement('img');
        img.src = `${ "/api"+data?.images[0]}`;
        document.getElementById('preload-imgs').appendChild(img);
      }
  
      const container = containerRef.current;
  
      if (container) {
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove);
  
        return () => {
          container.removeEventListener('touchstart', handleTouchStart);
          container.removeEventListener('touchmove', handleTouchMove);
        };
      }
    }, [data?.images[0]]);
  
    const handleTouchStart = (e) => {
      startXRef.current = e.touches[0].clientX;
    };
  
    const handleTouchMove = (e) => {
        console.log("workingggg");
      const distance = e.touches[0].clientX - startXRef.current;
      const num = 36;
      const imgNum = Math.floor(distance / 8);
  
      if (distance > 0) {
        changeImg(imgNum);
      } else if (distance < 0) {
        changeImgR(-imgNum);
      }
    };
  
    const changeImg = (imgNum) => {
      const num = 36;
      imgNum = Math.floor(imgNum / 8);
  
      if (imgNum < 1) {
        imgNum += num;
      }
      if (imgNum > num) {
        imgNum -= num;
      }
  
      setCurrentImage(imgNum);
    };
  
    const changeImgR = (imgNum) => {
      const num = 36;
      imgNum = Math.floor(imgNum / 8);
  
      const num2 = -Math.abs(num);
      if (imgNum > num2) {
        imgNum += num;
      }
      if (imgNum <= num2) {
        imgNum += num * 2;
      }
  
      setCurrentImage(imgNum);
    };
  
    return (
        <div className={`modal fade ${show360Modal ? 'show' : ''}`} id="explore360Modal" tabIndex="-1" role="dialog" aria-labelledby="explore360ModalLabel" aria-hidden={!show360Modal}>

            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">

                        <button type="button" className="close" onClick={() => setShow360Modal(false)} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body">
                  

                    <div style={{ width: '100%', height: '100%', maxWidth: '726px', minWidth: '320px', margin: '0 auto' }} className="container">
    <div style={{ border: '1px solid #ccc', width: '100%', maxWidth: '640px', margin: '0 auto', padding: '0', cursor: 'ew-resize' }} className="img-container">
        <div style={{ width: '100%', margin: '0', padding: '0', lineHeight: '0' }} className="img360">
            <img id="myImg" src={"/api"+data?.images[0]} />
        </div>
    </div>
    <div style={{}} className="caption">
      
    </div>
    <div id="preload-imgs" style={{ display: 'none' }}></div>
</div>



                    </div>


                </div>
            </div>
        </div>
    );
};

export default Modal360;
