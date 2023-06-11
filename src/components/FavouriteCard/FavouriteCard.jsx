import React from 'react';
import { Link } from 'react-router-dom';
import { convertirNumero } from '../../utils';
import styles from '../Motorcycle/Motorcycle.module.scss';

export const FavouriteCard = ({data}) => {

  const { id, brand, image, price, model, category, description, year } = data;

  return (
    <div className={styles.motorcycle}>
      <div className={styles.path}></div>
      <Link to={`/${id}`}>
        <div className={styles.imageContainer}>
          <img className={styles.motorcyleImage} src={image} alt={brand} loading='lazy' />
        </div>
        <div className={styles.motorcycleInfo}>
          <div className={styles.info}>
            <p>{category}</p>
            <h4>{`${brand} ${model}`}</h4>
            <p>{year}</p>
            {/* <p>{description}</p> */}
          </div>
          <div className={styles.buttonContainer}>
            <p>$USD {convertirNumero(price)}</p>
            <Link to={`/${id}`}>Details</Link>
          </div>
        </div>
      </Link>
    </div>
  )
}
