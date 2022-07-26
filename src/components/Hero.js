import React from 'react'
import { useFilterContext } from '../context/FilterContext'
import styled from "styled-components"
import { Link} from 'react-router-dom'
import { getUniqueValues, formatPrice } from '../utils/helpers'

function Hero() {
  const {
    updateSection,
    filters_section:{category:cat},
    section_products: products,
    all_products,
  } = useFilterContext()
  const categories = getUniqueValues(all_products,"category")
 
  return (
  
    <Wrapper>
      <div className='section-center'>
        {
           <form onSubmit={(e)=>e.preventDefault()}>
              <div className='form-control'>
                {
                  categories.map((category, index) => {
                    return (
                      <button
                        key={index}
                        type='button'
                        name='category'
                        onClick={(e)=>{updateSection(e,{cat},"category")}}
                        className={`${cat === category.toLowerCase() ? 'active' : null }`} 
                      >
                          <Link to={`/products/${category}`} >{category} </Link>  
                          
                      </button>
                    )
                  })
                }
              </div>
            </form>
          }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
    background: var(--clr-primary-10);
    width: 100%;
    min-height: 8vh;
    height: 3rem;
    max-width: var(--max-width-hero);
    color: var(--clr-primary-1);
  .section-center{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .active {
    border-color: var(--clr-grey-5);
  }

  button {
    display: inline-block;
    margin: 1.05em 5.25em 1.25em 5.25em;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    cursor: pointer;
  }
  .nav-links {
    list-style-type:none
  }
`

export default Hero