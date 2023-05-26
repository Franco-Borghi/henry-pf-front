import React from 'react';
import styles from './ShoppingChart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToChart, deleteItemFromChart, updateChartItemQuantity } from '../../redux/actions';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export function ShoppingChart() {

  const { isAuthenticated, user } = useAuth0();
  const shoppingChart = useSelector(state => state.shoppingChart);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return (
      <Navigate replace to='/' />
    )
  }

  return (
    <div className={styles['shopping-chart-container']}>
      {
        shoppingChart.map(el => (
          <div>
            <h1>{`${el.id}`}</h1>
            <p onClick={() => dispatch(deleteItemFromChart(el))} style={{ color: '#ff3300', cursor: 'pointer' }}>Delete</p>
            <div>
              <span onClick={() => el.quantity > 1 && dispatch(updateChartItemQuantity({id: el.id, quantity: -1, userId: user.email}))} style={{cursor: 'pointer', padding: '0 10px'}}>-</span>
              <span>{`${el.quantity}`}</span>
              <span onClick={() => dispatch(updateChartItemQuantity({id: el.id, quantity: 1, userId: user.email}))} style={{cursor: 'pointer', padding: '0 10px'}}>+</span></div>
          </div>
        ))
      }
    </div>
  )
}
