import React from 'react'
import { Checkout } from '../Checkout/Checkout'

export function CheckoutPage() {
  return (
    <div>
        <h1>Checkout Page</h1>
        <br/>
        <Checkout amount={0.01}/>
    </div>
  )
}
