import React from 'react';
import styles from './ShoppingCart.module.scss';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Link } from 'react-router-dom';
import { ShoppingCartCard } from './ShoppingCartCard';
import { Checkout } from '../../components/CheckoutPage/Checkout';

export function ShoppingCart() {

  const { isAuthenticated } = useAuth0();
  const shoppingCart = useSelector(state => state.shoppingCart);

  if (!isAuthenticated) {
    return (
      <Navigate replace to='/' />
    )
  }


  return (
    <div className={styles['shopping-cart-container']}>
      {
        shoppingCart.map(element => (
          <ShoppingCartCard el={element}/>
        )).reverse()
      }

      {/* <Link style={{ margin: '50px auto', display: 'block', width: 'fit-content', cursor: 'pointer' }} to ='/checkout'>
        <button style={{
          background: '#484848',
          color: '#fff',
          padding: '10px 15px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>Finalizar Compra</button>
      </Link> */}
      <Checkout />
    </div>
  )
}
