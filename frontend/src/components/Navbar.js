import React, { useState } from 'react'
import Cart from '../screens/Cart'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Model';
import { useCart } from './ContextReducer';
export default function Navbar() {
    const [cartView, setCartView] = useState(false)

    let data = useCart();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");   //To remove login user authonticate Token after clicking on Logout
        navigate("/login")  //& navigate user to login
    }

    return (
        <div className='fw-bold'>   {/*fw-bold for bold the text*/}
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    {/* "fs-1" for font size & "fst-italic" for font to be in italic  */}
                    <Link className="navbar-brand  fs-1 fst-italic fw-bold" to="/">fOOdie</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2"> {/*me-auto-> pushing two items to the right i.e. logout & mycart*/}
                            <li className="nav-item">
                                <Link className="nav-link active fs-7" aria-current="page" to="/">Home</Link>
                            </li>

                            {/* If user is login then authToken is true & show MyOrders */}
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-7" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                                : ""}
                        </ul>

                        {/* If user is not login then authToken is false i.e. not present & show Login & SignUp
                        else show My Cart & Logout */}
                        {(!localStorage.getItem("authToken")) ?
                            <div className='d-flex'>    {/*d-flex make comp. inline*/}
                                {/* to="" value same as Route path="" in App.js */}
                                <Link className="btn bg-white text-success mx-1 fw-bold" to="/login">Login</Link>
                                {/* to="" value same as Route path="" in App.js */}
                                <Link className="btn bg-white text-success mx-1 fw-bold" to="/createuser">SignUp</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-2 fw-bold' onClick={() => { setCartView(true) }} >
                                    My Cart {" "}
                                    <Badge pill bg='danger'>{data.length}</Badge>
                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /> </Modal> : null} {/*onClose from Model.js*/}
                                <div className='btn bg-danger text-white mx-2 fw-bold' onClick={handleLogout}> {/*handleLogout for handling logout function*/}
                                    Logout
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
