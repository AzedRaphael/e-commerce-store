import React from 'react'
import styled from 'styled-components'
//import { useCartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { CartContent} from '../components'
const CartPage = () => {
  return(
    <div>cart page</div>
  )
  //const { cart } = useCartContext()
  // if (cart.length < 1) {
  //   return (
  //     <Wrapper className='page-100'>
  //       <div>welcome to cart pages</div>
  //       <div className='empty'>
  //         <h2>Your cart is empty</h2>
  //         <Link to='/' className='btn'>
  //           fill it
  //         </Link>
  //       </div>
  //     </Wrapper>
  //   )
  // }
  return (
    <main>
      
      <Wrapper className='page'>
        <CartContent></CartContent>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
