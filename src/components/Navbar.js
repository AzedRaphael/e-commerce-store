import React from 'react'
import logo from "../logo2.png"
import { Link } from 'react-router-dom'
import CartButtons from './CartButtons'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import { FaCheck } from 'react-icons/fa'
import styled from 'styled-components'

function Navbar({user}) {
  return (
    <NavContainer>
     
         <div className="nav-center">
          <div className='nav-header'>
      
            <Link to="/"><img src={logo}  alt=""/></Link>
          </div>
         
          <div className='nav-links'>
           <form onSubmit={(e)=>e.preventDefault()}>
               <div className='form-control'>
                 {/* search begins */}
                 <input 
                   type="text" 
                   name='text' 
                   placeholder='search' 
                   className='search-input'
                 />
               </div>
           </form>
          </div>
         
              {user ? (
                <div className="nav-buttons">
                  <div>John Doe</div>
                  <div>Logout</div>
                  <CartButtons />
                </div>
                ) : ( 
                  <div className="nav-buttons">
                    <div> <Link to="/Login">Login</Link> </div>
                    <CartButtons />
                  </div>
                )
              }
          
         </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  width:90vw;
  height:5em;
 
  .nav-center{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-tems:center;
  }
  .nav-header{
    margin-left:5em;
    margin-top:0.7em;
  }
  .nav-header img{
    margin-top:1.1rem;
  }
  .form-control {
  margin-bottom: 1.25rem;
  margin-top:1.2rem;
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radiusNavbar);
    border-color: transparent;
    letter-spacing: var(--spacing);
    width:39.5em;
    height:3.125em;
    margin: 0 1.3em
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  .nav-buttons{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    font-size: 1.5rem;
  }
  .nav-buttons div:nth-child(2){
    margin: 0 7px;
  }
`

export default Navbar