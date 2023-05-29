import React from 'react';
import styles from './ShoppingCart.module.scss';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Link } from 'react-router-dom';
import { ShoppingCartCard } from './ShoppingCartCard';
import { CheckoutButton } from '../../components/CheckoutButton/CheckoutButton';

export function ShoppingCart() {

  const { isAuthenticated } = useAuth0();
  const shoppingCart = useSelector(state => state.shoppingCart);

  if (!isAuthenticated) {
    return (
      <Navigate replace to='/' />
    )
  }


  return (
    <div style={{ display: !shoppingCart.length && 'flex', flexDirection: !shoppingCart.length && 'column', justifyContent: !shoppingCart.length && 'center' }} className={styles['shopping-cart-container']}>
      {
        shoppingCart.length
        ? <>
            {
              shoppingCart.map(element => (
                <ShoppingCartCard el={element}/>
              )).reverse()
            }

            <CheckoutButton />
          </>
        : <div>
            <h1 style={{textAlign: 'center'}}>Your shopping cart is empty</h1>
            <h4 style={{textAlign: 'center'}}>Add a product to the shopping cart to view it on this page</h4>
          </div>
      }
    </div>
  )
}
