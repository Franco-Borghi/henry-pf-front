import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import styles from "./Motorcycle.module.scss";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Rating from '@mui/material/Rating'; 

export default function Motorcycle(props) {

  const { id, brand, image, price, model, category, description, year } = props.info;
  const allMotorcycles = useSelector(state => state.allMotorcycles);
  const [stock, setStock] = React.useState(true);
  const [rating, setRating] = useState(null)

  function convertirNumero(numero) {
    // Convertir el número a string
    let numeroString = numero.toString();
  
    // Verificar si el número tiene parte decimal
    if (numeroString.includes('.')) {
      // Dividir el número en parte entera y parte decimal
      let partes = numeroString.split('.');
      
      // Formatear la parte entera
      let parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
      // Combinar la parte entera formateada con la parte decimal
      let resultado = parteEntera + ',' + partes[1];
      
      return resultado;
    } else {
      // Formatear el número entero
      let numeroFormateado = numeroString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
      return numeroFormateado;
    }
  }

  React.useEffect(() => {
    setStock(allMotorcycles.some(moto => moto.id === id && moto.items.some(item => item.sold === false)))
    axios.get(`${process.env.REACT_APP_HOST_NAME}/reviews/motorcycles/${id}`)
      .then(d => {
        if(d.data.length > 0) {let total = 0;
        d.data.forEach(r => total += r.rating)
        setRating( Math.ceil(total/d.data.length))}
      })
  }, [])

  return (
    <div style={{ transform: !stock ? 'none' : ''}} className={styles.motorcycle}>
      {
        stock
        ? null
        : <h2>Item out of stock</h2>
      }
      <div style={{ opacity: stock ? '1' : "0.5"}} className={styles.path}></div>
      <Link style={{ opacity: stock ? '1' : "0.5"}} to={`/${id}`}>
        <div className={styles.imageContainer}>
          <img className={styles.motorcyleImage} src={image} alt={brand} loading='lazy' />
        </div>
        <div className={styles.motorcycleInfo}>
          <div className={styles.info}>
            <p>{category}</p>
            <h4>{`${brand} ${model}`}</h4>
            <p>{year}</p>
            {rating !== null ? 
            <Rating
            name="read-only-motorcycle"
            value={rating}
            readOnly
          /> 
            :null}
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
