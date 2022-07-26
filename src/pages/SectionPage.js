import React,{useEffect} from 'react'
import {useFilterContext} from "../context/FilterContext"
import {useProductsContext} from "../context/ProductContext"
import GridViewSec from '../components/GridViewSec'
import ListView from '../components/ListView'
import {Loading} from "../components"
//import { Filters, ProductList, Sort} from '../components'

function SectionPage() {
 
  const {  products_loading:loading,filtered_products: products, grid_view} = useFilterContext()
  //const {fetchProducts}= useProductsContext
  // console.log(products)
  // useEffect(()=>{
  //   fetchProducts()
  // },[])
//  if(loading){
//   return <Loading />
//  }
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }

  if (grid_view === false) {
    return <ListView products={products} />
  }
  return <GridViewSec products={products} />
}

export default SectionPage