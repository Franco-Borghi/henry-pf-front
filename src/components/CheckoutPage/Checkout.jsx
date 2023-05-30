import React, { useState } from 'react'
import { CheckoutButton } from '../CheckoutButton/CheckoutButton'
import { useSelector } from 'react-redux'
import Style from "./Checkout.module.css"

export function Checkout() {

  const shoppingCart = useSelector(state => state.shoppingCart);
  console.log(shoppingCart[0].unitPrice)

  const suma = shoppingCart.map(el => el.unitPrice)
  const resume = suma.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
  }, 0);
  
  return (
    <div className={Style.div}>
        {shoppingCart.length
          ? shoppingCart.map(el=><h1>$USD {el.unitPrice}</h1>)
          : <h2></h2>
          }
        <h3>Resume : $USD {resume}</h3>
        <br/>
        <CheckoutButton />
    </div>
  )
}
