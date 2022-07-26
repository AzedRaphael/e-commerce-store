import React, { useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../context/ProductContext';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {Loading,Error,AddToCart,Stars} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product:products,
    fetchSingleProduct,
  } = useProductsContext();

  let isApiSubscribed;
  useEffect(() => {
    isApiSubscribed = true;
    if(isApiSubscribed){
      fetchSingleProduct(`${url}${id}`)
    }
    // eslint-disable-next-line
    return ()=>{
      isApiSubscribed = false;
    }
  }, [id]);
  
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

return (
    <Wrapper>
        <div className='section section-center page'>
          <Link to='/' className='btn'>
            back to products
          </Link>
          <div >
              {
                  products.filter(p=>p._id===id).map((product,id)=>{
                    const {image,stars,averageRating,description,inventory,name,_id,category,price} = product
                      return(
                        <div key={id} className='product-center'>
                          <img src={image} alt="main" className='main'/> 
                          <section className='content'>
                            <h2>{name}</h2>
                            <Stars stars={product.stars} reviews={averageRating} />
                            <h5 className='price'>{formatPrice(price)}</h5>
                            <p className='desc'>{description}</p>
                            <p className='info'>
                              <span>Available : </span>
                              {inventory > 0 ? 'In stock' : 'out of stock'}
                            </p>
                            <p className='info'>
                              <span>SKU :</span>
                              {_id}
                            </p>
                            <p className='info'>
                              <span>Category :</span>
                              {category}
                            </p>
                            <hr />
                            {inventory > 0 && <AddToCart product={product} />}
                          </section>
                        </div>
                      )
                    }
                  )
               }
          </div>
         </div>
    </Wrapper>
  )
};

const Wrapper = styled.main`
.main {
  height: 600px;
}
img {
  width: 100%;
  display: block;
  border-radius: var(--radius);
  object-fit: cover;
}
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
