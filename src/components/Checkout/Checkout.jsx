import React from 'react'
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";



export  function Checkout({amount}) {
  return (
    <div>
        <PayPalScriptProvider options={{ "client-id": "AcTCep24viqXlaUug9XShWiauoDS3p6hvTmv5t3pQrOaahWVDdblCE7sq7orCcb_U295vTzA5zwJq3gY" }}>
            {/* TODO: To move the client id to a .env file soon */}
            <PayPalButtons
            fundingSource= {FUNDING.PAYPAL}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: 2.50, // TODO: to replace with "amount" when we pass it through props
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        // Your code here after create the order
                        return orderId
                    })
                    .catch((error) => {
                        console.error("Order creation error:", error);
                    });
            }} />
        </PayPalScriptProvider>
    </div>
  )
}
