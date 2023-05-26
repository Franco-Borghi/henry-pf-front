import React from 'react'
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";


export  function Checkout({amount}) {
  return (
    <div>
        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_CLIENT_ID_SANDBOX }}>
            <PayPalButtons
            fundingSource= {FUNDING.PAYPAL}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: amount, 
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
                    
                 }} 

            onApprove={function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert("Transaction completed") 
                    console.log('Order Details:');
                    console.log('ID:', details.id);
                    console.log('Intent:', details.intent);
                    console.log('Status:', details.status);
                    console.log('Purchase Units:', details.purchase_units);
                    console.log('Amount:', details.amount);
                    console.log('Create Time:', details.create_time);
                    console.log('Update Time:', details.update_time);
                    console.log('Links:', details.links);
                    // Esto es lo que me logueo:
                    /* Order Details:
                    Checkout.jsx:39 ID: 2MW783865U251822S
                    Checkout.jsx:40 Intent: CAPTURE
                    Checkout.jsx:41 Status: COMPLETED
                    Checkout.jsx:42 Purchase Units: Array(1)0: amount: {
                        currency_code: 'USD', 
                        value: '0.01'
                    }
                        payee: {
                            email_address: 'sb-vsu9e26092046@business.example.com', 
                            merchant_id: 'M2LBLWX83TAEE'}
                            payments: {captures: Array(1)}
                            reference_id: "default"
                            shipping: {name: {…}, address: {…}}
                            soft_descriptor: "PAYPAL *TEST STORE"}
                    Checkout.jsx:43 Amount: undefined
                    Checkout.jsx:44 Create Time: 2023-05-26T03:33:19Z
                    Checkout.jsx:45 Update Time: 2023-05-26T03:34:11Z
                    Checkout.jsx:46 Links:  */
                });
            }}
            />
        </PayPalScriptProvider>
    </div>
  )
}
