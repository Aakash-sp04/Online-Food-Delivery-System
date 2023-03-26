import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

//Here, action ex:- addToCart, delete
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]   //To save all things of a foodItem
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)  //array.splice(index, howmany, item1, ....., itemX)
            // index ->	The position to add/remove items.
            // howmany -> Number of items to be removed.
            // item1, ..., itemX -> New elements(s) to be added.    
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                console.log(food.id+" foodsize");
                console.log(action.id+" size");
                
                if (food.id === action.id) {  //if aready present id of state == new dispatch id
                    console.log(food.qty, parseInt(action.qty), action.price + food.price);
                    console.log("Hello ///////////////////");
                    
                    //then, add food, add qty & add price in Cart
                    arr[index] = { ...food, qty: parseInt(action.qty) + parseInt(food.qty), price: action.price + food.price }
                }
            })
            return arr
        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log("Error in Reducer");
    }
}

export const CartProvider = ({children}) => {

    //Dispatch means Multiple no. of cases(features) to add in one state
    const [state,dispatch] = useReducer(reducer, []) //Initial state of list is [] i.e. empty array
    //as Cart is initially empty   
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);