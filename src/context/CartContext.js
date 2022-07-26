import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/CartReducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'
//localstorage stores data even though the session is over or refreshed that way users items will be prrserved on the browsers api
//if the cart key (in localstorage) is true, we return data object as string after parsing into the local storage
const getLocalStorage = ()=>{
  let cart = localStorage.getItem("cart");
  if(cart){
    return JSON.parse(localStorage.getItem("cart"))
  }
  else{
    return []
  }
}

const initialState = {
  cart:getLocalStorage(),
  total_items:0,
  total_amount:0,
  shipping_fee:534,

}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)

  //addtocart points from the singlepage to the cart page
  const addToCart = (id,color,amount,product)=>{
    dispatch({type:ADD_TO_CART,payload:{id,color,amount,product}})
  }

  //remove item
  const removeItem = (id)=>{
    dispatch({type:REMOVE_CART_ITEM, payload:id})
  }

  //toggle amount
  const toggleAmount = (id,value) =>{
    dispatch({type:TOGGLE_CART_ITEM_AMOUNT, payload:{id,value}})
  }

  //clear Cart
  const clearCart =()=>{
    dispatch({type:CLEAR_CART})
  }

  //each time the cart state changes the storage updates the key value (cart and stringify state.cart) in the browser.
  useEffect(()=>{
    dispatch({type:COUNT_CART_TOTALS})
    localStorage.setItem("cart", JSON.stringify(state.cart))
  },[state.cart])
  return (
    <CartContext.Provider value={{...state,addToCart,removeItem,clearCart,toggleAmount}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
