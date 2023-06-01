import React from "react";
import { PayPalScriptProvider,PayPalButtons,FUNDING,} from "@paypal/react-paypal-js";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import { addItemToCart, fetchData } from "../../redux/actions";
import { useDispatch } from "react-redux";

export function CheckoutButton() {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 

  const shoppingCart = useSelector((state) => state.shoppingCart);
  

  const itemsToPost = shoppingCart.map((el) => {
    
    if (el.quantity > 1) {
        const array = [];
        for (let i = 0; i < el.quantity; i++) {
            array.push({
            id: el.id,
            color: capitalizeString(el.color),
            });
        }
        return array;
    } 

    return {
        id: el.id,
        color: capitalizeString(el.color),
    }
    }).flat();

    


  function handleSubmit() {
    return shoppingCart.reduce(
      (acc, el) => acc + (el.unitPrice * el.quantity), 0);
  }

  return (
    <div>
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_CLIENT_ID_SANDBOX }}
      >
        <PayPalButtons
          fundingSource={FUNDING.PAYPAL}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: handleSubmit(),
                    },
                  },
                ],
              })
              .then((orderId) => {
               

                return orderId;
              })
              .catch((error) => {
                console.error("Order creation error:", error);
              });
          }}
          
          onApprove={(data, actions) => {
            return actions.order
            .capture()
            .then((details) => {
              // Se capturó el pago con éxito, realizar acciones adicionales
              new swal({
                title: "Success",
                text: "Transaction completed successfully",
                icon: "success",
                buttons: true,
              });
      
              fetch(`${process.env.REACT_APP_HOST_NAME}/orders`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  orderNumber: details.id,
                  amountPaid: details.purchase_units[0].amount.value || handleSubmit(),
                  userId: user?.sub,
                  items: itemsToPost,
                  orderStatus: "Completed"
                })
              })
                .then(response => response.json())
                .then(data => {
                  fetchData(dispatch);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
            })
            .catch((error) => {
              console.error('Capture payment error:', error);

              new swal({
                title: "Error",
                text: "Payment capture failed. The PayPal window was closed.",
                icon: "error",
                buttons: true,
              });
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
