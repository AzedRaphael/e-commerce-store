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
  
  const FiltersReducer = (state, action) => {
    if (action.type === LOAD_PRODUCTS) {
     
      function getPrice(element){
        return element.price
      }
      
      let maxPrice = action.payload.map(getPrice)      
      maxPrice = Math.max(...maxPrice)
      
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        section_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
        filters_section:{...state.filters_section},
        products_loading: true,
      }
    }
    if (action.type === SET_GRIDVIEW) {
      return { ...state, grid_view: true }
    }
    if (action.type === SET_LISTVIEW) {
      return { ...state, grid_view: false }
    }
    if (action.type === UPDATE_SORT) {
      return { ...state,...state.filters_section, sort: action.payload }
    }
    if (action.type === SORT_PRODUCTS) {
      const { sort, filtered_products } = state
      let tempProducts = []
      if (sort === 'price-lowest') {
        tempProducts = filtered_products.sort((a, b) => {
          return a.price - b.price
        })
      }
      if (sort === 'price-highest') {
        tempProducts = filtered_products.sort((a, b) => {
          return b.price - a.price
        })
      }
      if (sort === 'name-a') {
        tempProducts = filtered_products.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-z') {
        tempProducts = filtered_products.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
  
      return { ...state,...state.filters_section, filtered_products: tempProducts }
    }
    //UPDATE FILTERS to get name and value
    if (action.type === UPDATE_FILTERS) {
      const { name, value } = action.payload
      return { ...state,...state.filters_section, filters: { ...state.filters, [name]: value } }
    }
    //FILTERS PRODUCTS if the value is not all
     if (action.type === FILTER_PRODUCTS) {
      const { all_products } = state
      const {  price, shipping } = state.filters
      let tempProducts = [...all_products]      
     
      // filter by price
      tempProducts = tempProducts.filter((product) => product.price <= price)
      // filter by shipping
      if (shipping) {
        tempProducts = tempProducts.filter((product) => product.shipping === true)
      }
      return { ...state, ...state.filters_section,filtered_products: tempProducts }
    }
    //UPDATE THE SECTIONS
    if (action.type === UPDATE_SECTION_FILTERS) {
        const { name, value } = action.payload
        return { ...state,...state.filters, filters_section: { [name]: value }, products_loading: true }
      }
    //FILTER THE SECTIONS IF ALL IS NOT EQUAL TO
    if(action.type === FILTER_SECTION_PRODUCTS){
        let {all_products} = state
        const {category} = state.filters_section
        
        let tempProducts = [...all_products]
        let allProducts = [...all_products]
        let tempcategory = category.trim();
        console.log(category !== "all ")
     if (category !== "all "){    
            tempProducts = tempProducts.filter(
               (product) => product.category === tempcategory 
            )
      }  
      else{
          tempProducts = allProducts
      } 
      let filtered_products = tempProducts
      console.log(filtered_products)
        return { ...state,...state.filters_section,filtered_products:tempProducts, products_loading: true}
    }

   
    if (action.type === CLEAR_FILTERS) {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
        filters_section:{category: 'all'}
      }
    }
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default FiltersReducer
  