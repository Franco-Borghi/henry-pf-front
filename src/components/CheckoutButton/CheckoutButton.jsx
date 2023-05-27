import React from "react";
import { PayPalScriptProvider,PayPalButtons,FUNDING,} from "@paypal/react-paypal-js";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import { addItemToCart } from "../../redux/actions";
import { useDispatch } from "react-redux";

export function CheckoutButton() {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const shoppingCart = useSelector((state) => state.shoppingCart);
  console.log("shoppingCart", shoppingCart);

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
    } //TODO: test with a new motorcycle added to see the quantity part

    return {
        id: el.id,
        color: capitalizeString(el.color),
    }
    }).flat();

    console.log("itemsToPost", itemsToPost)


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
                console.log("Order ID:", orderId);

                return orderId;
              })
              .catch((error) => {
                console.error("Order creation error:", error);
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              new swal({
                title: "Success",
                text: "Transaction completed successfully",
                icon: "success",
                buttons: true,
              });

              dispatch(addItemToCart([]));
              localStorage.setItem(
                `shoppingCart${user.email}`,
                JSON.stringify([])
              );

              fetch('http://localhost:3001/orders', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      orderNumber: details.id,
                      amountPaid: details.purchase_units[0].amount.value || handleSubmit(),
                      userId: user.sub,
                      items: itemsToPost,
                      orderStatus: "Completed"
                  })
              })
              .then(response => response.json())
              .then(data => {
                  console.log('Success:', data);
              })
              .catch((error) => {
                  console.error('Error:', error);
              });

              console.log("Order Details:");
              console.log(details)

            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
