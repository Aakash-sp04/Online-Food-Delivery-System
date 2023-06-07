import React from 'react'
import Footer from '../components/Footer'
import {useNavigate } from 'react-router-dom'
import {useDispatchCart } from '../components/ContextReducer';

export default function CheckoutSuccess() {
    const navigate = useNavigate();
    let dispatch = useDispatchCart();

    const handleClick=()=>{
        dispatch({ type: "DROP" })  //To remove data from cart again
        navigate("/")  //& navigate user to home page
    }

    return (
        <div className="bodySuccess">
            <div className="successCard">
                <div className='checkMark'>
                    <i className="checkmark">✓</i>
                </div>
                <h1 className='headSuccess'>Success</h1>
                <p className='paraSuccess'>We received your purchase request;<br /> we'll be in touch shortly!</p>
                <button className='btn btn-success mt-5 fw-bold text-white' onClick={handleClick}>Back to Home Page</button>
            </div>
            <Footer/>
        </div>
    )
}
