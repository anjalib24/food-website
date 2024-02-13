import React, { useEffect } from 'react';
import { useProductState } from './context/ProductContext';
import Test from "./Test";

const Modal360 = ({ data }) => {
    const { show360Modal, setShow360Modal } = useProductState();
    const modalRef = React.useRef(null);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (show360Modal) {
            modalElement.style.display = 'block';
            modalElement.classList.add('show');
            modalElement.setAttribute('aria-hidden', 'false');
        } else {
            modalElement.style.display = '';
            modalElement.classList.remove('show');
            modalElement.setAttribute('aria-hidden', 'true');
        }
    }, [show360Modal]);

    const handleClose = () => {
        document.body.classList.remove('modal-open');
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
        while (modalBackdrops[0]) {
            document.body.removeChild(modalBackdrops[0]);
        }
    
        setShow360Modal(false);
    };

    return (
        <div ref={modalRef} className="modal" id="explore360Modal" tabIndex="-1" role="dialog" aria-labelledby="exploreModalLabel" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{ minHeight: "400px" }}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">360 view of product</h5>
                        <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Test data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal360;