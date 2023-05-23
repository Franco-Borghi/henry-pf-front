import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './Detail.module.scss';

export default function Detail() {
  const [motorcycle, setMotorcycle] = useState(null);
  const [colors, setColors] = useState([])
  const { id } = useParams();
  const [description, setDescription] = React.useState(true);
  const [details, setDetails] = React.useState(false);

  const handleDescription = () => {
    setDetails(false);
    setDescription(true);
  }

  const handleDetails = () => {
    setDescription(false);
    setDetails(true);
  }


  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/motorcycles/${id}`);
        setMotorcycle(response.data);
        let auxColors = []
        response.data.items.forEach(i => {if(!auxColors.includes(i.color)) auxColors.push(i.color)
        setColors(auxColors)
        })
      } catch (error) {
        console.log(error);
      }
    };
    fetchMotorcycle();
  }, [id]);

  if (!motorcycle) {
    return <div>Searching...</div>;
  }

  return (
    <article className={styles['detail-container']}>
      <div className={styles['img-container']}>
        <img src={motorcycle.image} alt='product-image' />
      </div>
      <div className={styles['detail']}>
        <div>
          <div className={styles['title-container']}>
            <p>{motorcycle.category}</p>
            <h1>{motorcycle.brand} {motorcycle.model}</h1>
            <h3>{motorcycle.year}</h3>
          </div>
          <div className={styles['separator']}></div>
          <div className={styles['price-container']}>
            <div>
              <div style={{ fontWeight: '700'}}>Price:</div>
              <h4>${motorcycle.price}</h4>
            </div>

            <div>
              <label className={styles['cart-container']}>
                Add to cart 
                <ion-icon style={{ color: "#fff "}} className='svg' size="small" name="cart-outline"></ion-icon>
              </label>
            </div>
          </div>
        </div>
        <div className={styles['selector-container']}>
          <div className={styles['selector']}>
            <h4 onClick={handleDescription} className={styles[`${description}`]}>Description</h4>
            <h4 onClick={handleDetails} className={styles[`${details}`]}>Details</h4>
          </div>
          <div data-visible={`${description}`} className={styles[`selector-content`]}>
            <p>{motorcycle.description}</p>
          </div>
          <div data-visible={`${details}`} className={styles[`selector-content`]}>
            <p>Transmission: {motorcycle.transmission}</p>
            <p>CC: {motorcycle.cc}</p>
            <p>Color options: {colors?.map(c => <p>{c}</p>)}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
