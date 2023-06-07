import React from 'react'
import trash from "../trash.svg"
import { useCart, useDispatchCart } from '../components/ContextReducer';
import StripeCheckout from 'react-stripe-checkout'
import axois from 'axios'
import { toast } from 'react-toastify'
import {useNavigate } from 'react-router-dom'

export default function Cart() {

    toast.configure();  //For payment gateway

    let navigate = useNavigate();
    let data = useCart(); //From ContextReducer.js
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("http://localhost:5000/api/orderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("ORDER RESPONSE:::::", response.status)
        if (response.status === 200) {  //req has res
            dispatch({ type: "DROP" })  //To remove data when checkout
            navigate("/checkout-success");
        }
    }


    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    //For Payment Gateway
    async function handleToken(token, addresses) {
        const response = await axois.post("http://localhost:5000/checkout", { token, totalPrice })
        
        //take response
        console.log(response.status);
        if (response.status === 200) {
            console.log("Payment Successfully Done !");
            
            handleCheckOut();   //Checkout functionality for my records is called here
            
            navigate("/checkout-success");
            //toast("Payment Successfully Done !", { type: 'success' });
        } else {
            console.log("ERROR : Payment Not Done !");
            //toast("ERROR : Payment Not Done !", { type: 'error' });
        }
    }
    return (
        <div>
            {/*Simple Table*/}
            {console.log(data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>   {/*index + 1 as index start from 0*/}
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0"><img src={trash} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: ₹ {totalPrice}/-</h1></div>

                <table>
                    <tr>
                        <td>
                            {/* For Payment Gateway */}
                            <StripeCheckout
                                className='m-5'
                                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                                token={handleToken}
                                amount={totalPrice * 81.71}
                                billingAddress
                                shippingAddress />
                        </td>
                        <td>
                            <button className="btn bg-info text-white fw-bold" onClick={handleCheckOut}>Cash on Delivery</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}