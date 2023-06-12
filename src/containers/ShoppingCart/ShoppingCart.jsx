import React from 'react';
import styles from './ShoppingCart.module.scss';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Link } from 'react-router-dom';
import { ShoppingCartCard } from '../../components/ShoppingCartCard/ShoppingCartCard';
import { Checkout } from '../../components/CheckoutPage/Checkout';

export function ShoppingCart() {

  const { isAuthenticated } = useAuth0();
  const shoppingCart = useSelector(state => state.shoppingCart);
  const reduxUser = useSelector(state => state.user);

  if (!isAuthenticated || (isAuthenticated && reduxUser && reduxUser.role !== 'client')) {
    return (
      <Navigate replace to='/' />
    )
  }


  return (
    <div style={{ gap: !shoppingCart.length && '0', flexDirection: !shoppingCart.length && 'column', justifyContent: !shoppingCart.length && 'center' }} className={styles['shopping-cart-container']}>
      {
        shoppingCart.length
        ? <>
            <div className={styles['body-container']}>
              {
                shoppingCart.map(element => (
                  <ShoppingCartCard el={element}/>
                )).reverse()
              }
            </div>

            <div className={styles['checkout-container']}>
              <Checkout/>
            </div>
          </>
        // : <div>
        //     <h1 style={{textAlign: 'center'}}>Your shopping cart is empty</h1>
        //     <h4 style={{textAlign: 'center'}}>Add a product to the shopping cart to view it on this page</h4>
        //   </div>
        : <div className={styles['no-favs-section']}>
            <h4>Your shopping cart is empty</h4>
            <p>Add a product to the shopping cart to view it on this page.</p>
            <Link to='/'>Explore</Link>
          </div>
      }
    </div>
  )
}
