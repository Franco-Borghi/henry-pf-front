import React from 'react';
import Detail from '../../components/Detail/Detail';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import styles from './ItemDetail.module.scss';
import { useNavigate } from 'react-router-dom';

export function ItemDetail() {

  const navigate = useNavigate();

  return (
    <>
      <div className={styles['main-div']}>
        <div className={styles['return-to-home-button']} onClick={() => navigate('/')}>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.92388 0.444458L0 5.8889L5.92388 11.3333L7.39161 9.9844L2.93547 5.8889L7.39161 1.79341L5.92388 0.444458Z" fill="#000"/>
          </svg>
          <p className="normal-text secondary">Return to Home</p>
        </div>
        <section className={styles['card-detail-container']}>
          <Detail />
        </section>
      </div>
    </>
  )
}
