import React from 'react';
import './modal.css'


function Modal(props) {
    return (
        <div className='modal'>
            <header className='modal__header'><h2>{props.title}</h2></header>
            <section className='modal__content'>
                {props.children}
            </section>
            <section className='modal__actions'>
                {props.canCancel && <button className='btn'>Cancel</button>}
                {props.canConfirm && <button className='btn'>Confirm</button>}
            </section>
        </div>
    );
}

export default Modal;