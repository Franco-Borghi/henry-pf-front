import { Link } from 'react-router-dom';
import React from 'react'
import styles from "./Motorcycle.module.scss";

export default function Motorcycle(props) {
  const { id, brand, image, price, model, category } = props.info;
  return (
    <div className={styles.motorcycle}>
      <Link to={`/motorcycles/${id}`}>
        <div className={styles.imageContainer}><img className={styles.motorcyleImage} src={image} alt={brand} /></div>
        <div className={styles.motorcycleInfo}>
          <h1>{price}</h1>
          <h2>{brand}</h2>
          <h3>{model}</h3>
          <h4>{category}</h4>
        </div>
      </Link>
    </div>
  )
}
