import React from 'react';
import Detail from '../../components/Detail/Detail';
import styles from './ItemDetail.module.scss';
import { useNavigate } from 'react-router-dom';

export function ItemDetail() {

  return (
    <>
      <div className={styles['main-div']}>
        <section className={styles['card-detail-container']}>
          <Detail />
        </section>
      </div>
    </>
  )
}
