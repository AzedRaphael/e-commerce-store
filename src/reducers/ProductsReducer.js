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
  
 const ProductsReducer = (state,action)=>{
    if(action.type === GET_PRODUCTS_BEGIN){
        return {...state, products_loading:true}
    }

    if(action.type === GET_PRODUCTS_SUCCESS){
      console.log(action.payload)
      console.log(action.payload.products)
        const featured_products = action.payload.products.filter((product)=>product.featured === true)
        return {...state,product_loading:false, products:action.payload.products, featured_products}
    }
    if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
        return {
          ...state,
          single_product_loading: true,
          single_product_error: false,
        }
      }
      if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
        
        return {
          ...state,
          single_product_loading: false,
          single_product: action.payload,
          
        }
      }
      if (action.type === GET_SINGLE_PRODUCT_ERROR) {
        return {
          ...state,
          single_product_loading: false,
          single_product_error: true,
        }
      }
 }

 export default ProductsReducer