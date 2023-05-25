import React from 'react';
import './Modal.css';
import Backdrop from './Backdrop/Backdrop';
import { useSelector } from 'react-redux';

const Modal = ({show,closed}) => {
    const isLosing = useSelector(state => state.game.isLosing);
    return (
        <>
            <Backdrop show={show} clicked={closed}/>
            <div
                className="Modal"
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0',
                }}
            >
                <h3>{isLosing?'Sorry, try again!':'Congratulations, You won!'}</h3>
                <button className='button' type='button' onClick={closed}>reset</button>
            </div>
        </>
    );
};

export default Modal;