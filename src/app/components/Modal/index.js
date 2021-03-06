import React from 'react';
import './modal.css';

export default function Modal({id='modal', onClose=() => {}, children}) {

  const handleOutsideClick = (e) => {
    if(e.target.id === id) onClose();
  }

  return(
    <div id={id} className='modal' onClick={handleOutsideClick}>
      <div className='container-modal'>
        <button className='close' onClick={onClose}></button>
        <div className='content-modal'>{children}</div>
      </div>
    </div>
  )

}