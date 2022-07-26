import React, { useContext, useEffect, useReducer,useState } from 'react'
import reducer from '../reducers/ProductsReducer'
import axios from "axios"
//import { url } from '../utils/constants'

import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_BEST_PRODUCTS,
    GET_TOP_PRODUCTS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
  } from '../actions'
const initialState = {
products_loading: true,
products_error:false,
products:[],
featured_products:[],
best_products:[],
top_products:[],
single_product_loading:false,
single_product_error:false,
single_product:[]
}

// const url = 'http://localhost:5000/api/v1/product/'
//console.log(url)
const ProductsContext = React.createContext()

export function ProductProvider({children}) {
  //const { id } = useParams()
    //const [product, setProduct] = useState([])
    const [state,dispatch] = useReducer(reducer,initialState)
    useEffect(()=>{
        fetchProducts()
    },[])
    
    const fetchProducts = async()=>{
         
        dispatch({ type: GET_PRODUCTS_BEGIN })
        try {
            const response = await axios.get("/api/v1/product")
            const products = response.data
            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
        } catch (error) {
        dispatch({ type: GET_PRODUCTS_ERROR })
        }      
       
    }
    const fetchSingleProduct = async (id) => {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
      try {
        const response = await axios.get(`api/v1/product?id=`)
        const objValues = response.data
        const  productArr=Object.values(objValues)
        const singleProduct =productArr[0]
        
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
      } catch (error) {
        dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
      }
    }
    
    
  return (
    <ProductsContext.Provider value={{...state,fetchSingleProduct}}>
        {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext=()=>{
    return useContext(ProductsContext)
}

