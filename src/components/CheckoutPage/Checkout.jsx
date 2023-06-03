import React, { useState, useEffect } from 'react'
import { CheckoutButton } from '../CheckoutButton/CheckoutButton'
import { useSelector } from 'react-redux'
import Style from "./Checkout.module.scss"
import { useNavigate } from 'react-router-dom';
import { convertirNumero } from '../../utils';

export function Checkout() {

  const navigate = useNavigate();
  const shoppingCart = useSelector(state => state.shoppingCart);
  const allMotorcycles = useSelector(state => state.allMotorcycles);
  const [motosArray, setMotosArray] = useState(null);
  const suma = shoppingCart.map(el => el.unitPrice)
  const resume = suma.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
  }, 0);

  useEffect(() => {
    if (shoppingCart && allMotorcycles) {
      const array = shoppingCart.map(el => allMotorcycles.find(moto => el.id === moto.id));
      console.log(array);
      setMotosArray(array);
    }
  }, [shoppingCart, allMotorcycles])
  
  return (
    <div className={Style.div}>
      <div className={Style.main}>
        <h4>Summary of purchase</h4>
        {
          shoppingCart.length && shoppingCart.map((el, i) => (
            <>
              <div onClick={() => navigate(`/${el.id}`)} className={Style.infoContainer}>
                <p className={Style.brand}>{motosArray && motosArray.length && `${motosArray[i].brand} ${motosArray[i].model}`}</p>

                <p className={Style.color}>Color: {el.color.charAt(0).toUpperCase() + el.color.slice(1)}</p>
                <p className={Style.unitPrice}>Unit price: $USD {convertirNumero(el.unitPrice)}</p>
                <p className={Style.quantity}>Quantity: {el.quantity}</p>
                <p className={Style.itemSubtotal}>Item subtotal: $USD {convertirNumero(el.unitPrice * el.quantity)}</p>
              </div>
              <div className={Style.separator}></div>
            </>
          ))
        }
      </div>
      <div className={Style.cta}>
        <h3>
          <span>Subtotal:</span>
          <span>$USD {convertirNumero(resume)}</span>
        </h3>
        <CheckoutButton />
        <div onClick={() => navigate('/')} className={Style['custom-btn']}>Continue shopping</div>
      </div>
    </div>
  )
}
