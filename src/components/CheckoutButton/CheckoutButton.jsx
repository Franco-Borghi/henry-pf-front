import React from "react";
import { PayPalScriptProvider,PayPalButtons,FUNDING,} from "@paypal/react-paypal-js";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import { addItemToCart, fetchData, setCurrentOrder } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CheckoutButton() {

  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const navigate = useNavigate();

  function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const shoppingCart = useSelector((state) => state.shoppingCart); 
  const reduxUser = useSelector(state => state.user);

  const itemsToPost = shoppingCart.map((el) => {
    
    if (el.quantity > 1) {
        const array = [];
        for (let i = 0; i < el.quantity; i++) {
          console.log(el)
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

  const handleOrderCreate = (data, actions) => {

    if (reduxUser && (!reduxUser.firstName || !reduxUser.lastName || !reduxUser.phoneNumber || !reduxUser.idNumber)) {
      throw new Error('SWAL')
    }

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
  };

  const handleOrderCapture = (data, actions) => {
    setIsProcessing(true);

    return actions.order
      .capture()
      .then((details) => {
        new swal({
          title: "Success",
          text: "Transaction completed successfully",
          icon: "success",
          buttons: true,
        });
  
        dispatch(addItemToCart([]));
        localStorage.setItem(`shoppingCart${user?.email}`, JSON.stringify([]));
  
        const postData = {
          orderNumber: details.id,
          amountPaid: details.purchase_units[0].amount.value || handleSubmit(),
          userId: user?.sub,
          items: itemsToPost,
          orderStatus: "Completed",
        };

        console.log(postData.items)
        dispatch(setCurrentOrder({motorcycleId: postData.items[0].id, color: postData.items[0].color}))
  
        fetch(`${process.env.REACT_APP_HOST_NAME}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        })
          .then((response) => response.json())
          .then((data) => {
            fetchData(dispatch);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

          fetch(`${process.env.REACT_APP_HOST_NAME}/email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              destination: user.email,
              body: `Hello ${user.name},\n\nThank you for your purchase on our motorcycle sales website! We are excited to inform you that your order was successful.\n\nOrder Number: #${details.id}\n\nPlease keep this order number for future reference. Our team will process your order.\nIf you have any questions or require further assistance, please don't hesitate to contact our customer support team. We are here to help!\nThank you once again for choosing our website for your motorcycle purchase. We appreciate your business.\n\nBest regards,\nDinamo Motorcycles`,
              title: `Purchase Successful - Order #${details.id}`
            }),
          })
          .then((response) => console.log('E-mail sent'))
          .catch((error) => console.error("Error:", error));
        
        setIsProcessing(false);

        navigate("/create-image")
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error.message === "Can not send postrobot_method. Target window is closed") {
          console.error("La ventana emergente se cerró antes de completar la captura de la orden.");
        } else {
          console.error("Capture order error:", error);
        }
      });
  };

  React.useEffect(() => {
    const paypalPopup = document.querySelector('.paypal-checkout-sandbox');
    if (isProcessing && paypalPopup) {
      setTimeout(() => {
        paypalPopup.style.display = 'none';
      }, 50);
    } else if (!isProcessing && paypalPopup) {
      paypalPopup.style.display = 'block';
    }
  }, [isProcessing])

  return (
    <>
      <div>
        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_CLIENT_ID_SANDBOX }} >
          <PayPalButtons
            fundingSource="paypal"
            createOrder={handleOrderCreate}
            onApprove={handleOrderCapture}
            onError={(error) => {
              if (error.message === 'SWAL') {
                return new swal({
                  title: "Profile Incomplete",
                  text: "Please complete your profile to proceed",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: 'Complete',
                  cancelButtonText: 'Cancel'
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate('/profile')
                  }
                });
              }
                console.log('Button log: ', error.message);
              } 
            }
          />
        </PayPalScriptProvider>
      </div>
    </>
  );
}
