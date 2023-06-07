import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    let data = useCart();

    //For displaying price works same like 'document.innerHTML'
    const priceRef = useRef();

    let options = props.options;
    let priceOptions = Object.keys(options);    //Storing Option Object key-value
    
    //For default value of Add to Cart i.e. Qty. = 1 & Size = Half
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {    //data is useCart
            if (item.id === props.foodItem._id) { //IF data id  == new addtocart id 
                // console.log("Joker "+ item.id);
                // console.log("Joker2" + props.foodItem._id);
                food = item;    //then  data item store in variable food
                break;
            }
        }

        if (food !== []) { 
            console.log("in food");   //i.e. if food variable has some value in it
            if (food.size === size) { 

                console.log(food.size+" foodsize");
                console.log(size+" size");
                
                //i.e. update only if food qty. change(1,2,..,6) not size (half, medium)
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                console.log(data);
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                console.log("Size different so simply ADD one more to the list")
                // console.log(food.size+" foodsize");
                // console.log(size+" size");
                return
            }
            return  //to return null
        }
        //For 1st time add
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        console.log(data);
    }

    //To calculate price acc. to qty.
    let finalPrice = qty * parseInt(options[size]); //To convert size into integer & then multiply it

    //For displaying price
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div className='d-flex justify-content-center'>
            
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "450px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />  {/*For image resizing*/}
                <div className="card-body">
                    <h5 className="card-title fw-bold">{props.foodItem.name}</h5>
                    {props.foodItem.description}
                    <hr/>
                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                        {/* Quantity */}
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>   {/*For setting size*/}
                            {/* Curly Brackets means Javascript*/}
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        {/* Size */}
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>   {/*For setting size*/}
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>

                        {/* Price note here, inlinde included because div not give display in inline*/}
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>

                    {/*Add To Cart Functionality*/}
                    <hr/>
                    <button className={'btn btn-success justify-center fw-bold ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                    <div className='m-2 d-inline h-100 fs-6'>
                        {props.foodItem.ratings}⭐
                    </div>                            
                </div>
            </div>
        </div>
    )
}
