import React from 'react'
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from 'react-redux';



export  function Checkout() {

    const { user } = useAuth0();
    console.log("user", user)

    const items = useSelector(state => state.shoppingCart).map(item => item.id)

    const allMotorcycles = useSelector(state => state.allMotorcycles);
    console.log("items:", items)
    
    const cart = allMotorcycles.filter(motorcycle => items.includes(motorcycle.id))
    console.log("Cart", cart)

    const total = cart.reduce((acc, el) => acc + el.price, 0)
    console.log("Total", total)

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
                                    value: total, 
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        console.log("Order ID:", orderId);

                        // fetch('http://localhost:3001/orders', {
                        //     method: 'POST',
                        //     headers: {
                        //         'Content-Type': 'application/json'
                        //     },
                        //     body: JSON.stringify({
                        //         orderNumber: orderId,
                        //         amountPaid: total,
                        //         userId: user.sub,
                        //         items,
                        //         orderStatus: "Pending"
                        //     })
                        // })
                        // .then(response => response.json())
                        // .then(data => {
                        //     console.log('Success:', data);
                        // })
                        // .catch((error) => {
                        //     console.error('Error:', error);
                        // });

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
