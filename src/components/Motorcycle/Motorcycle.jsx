import { Link } from 'react-router-dom';
import React from 'react'
import styles from "./Motorcycle.module.scss";

export default function Motorcycle(props) {
  const { id, brand, image, price, model, category, description } = props.info;
  return (
    <div className={styles.motorcycle}>
      <div className={styles.path}></div>
      <Link to={`/${id}`}>
        <div className={styles.imageContainer}>
          <img className={styles.motorcyleImage} src={image} alt={brand} loading='lazy' />
        </div>
        <div className={styles.motorcycleInfo}>
          <div className={styles.info}>
            <h3>{`${brand}`}</h3>
            <h3>{`${model}`}</h3>
            <h4>{category}</h4>
            <p>{description}</p>
          </div>
          <div className={styles.buttonContainer}>
            <h4>${price}</h4>
            <Link to={`/${id}`}>Details</Link>
          </div>
        </div>
      </Link>
    </div>
  )
}
