import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/FiltersReducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  FILTER_SECTION_PRODUCTS,
  CLEAR_FILTERS,
  UPDATE_SECTION_FILTERS
} from '../actions'
import { useProductsContext } from './ProductContext'

const initialState = {
  filtered_products: [],
  section_products:[],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  products_loading: true,
  products_error:false,
  filters: {
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
  filters_section:{
    category: 'all'
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
 
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
    dispatch({type:FILTER_SECTION_PRODUCTS})
  }, [state.sort, state.filters,state.filters_section])

 
  // functions
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  const updateSort = (e) => {
   
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
   
   
    if (name === 'price') {
     value =   Number(value)   
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }
  function updateSection(e,value,name){    
    
    if (name === 'category') {
      value = e.target.textContent
    }
    dispatch({type:UPDATE_SECTION_FILTERS, payload:{name,value}})
  }
 
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
        updateSection
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
