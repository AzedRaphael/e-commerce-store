import React from 'react'
import { useFilterContext } from '../context/FilterContext'
import { useProductsContext } from '../context/ProductContext';
import GridView from './GridView'
import ListView from './ListView'
import {Loading} from '../components';
const ProductList = () => {
  const {single_product_loading: loading,products:prod} = useProductsContext();
  // const { filtered_products: prod, grid_view } = useFilterContext()
  
  // if (loading) {
  //   return <Loading />;
  // }
  
  if (prod.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }

  return <GridView products={prod} />
  // if (grid_view === false) {
  //   return <ListView products={prod} />
  // }
  // return <GridView products={prod} />
}

export default ProductList
