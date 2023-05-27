import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './Detail.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import swal from 'sweetalert2';

export default function Detail() {
  const [motorcycle, setMotorcycle] = useState(null);
  const [colors, setColors] = useState([]);
  const [pickedColor, setPickedColor] = useState(null);
  const { id } = useParams();
  const [description, setDescription] = React.useState(true);
  const [details, setDetails] = React.useState(false);
  const [shoppingCartButton, setShoppingCartButton] = React.useState(false);
  const { isAuthenticated, user } = useAuth0();

  const handleDescription = () => {
    setDetails(false);
    setDescription(true);
  }

  const handleDetails = () => {
    setDescription(false);
    setDetails(true);
  }

  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart);

  const handleDispatch = () => {
    if (!pickedColor) {
      return new swal({
        title: "Color missing",
        text: "Pick a color to continue",
        icon: "warning",
        buttons: true,
      })
    } else if (motorcycle && shoppingCart.some(el => el.id === motorcycle.id && el.color === pickedColor)) {
      return new swal({
        title: "Warning",
        text: "The motorcycle is already in yout shopping cart",
        icon: "warning",
        buttons: true,
      })
    }

    dispatch(addItemToCart({id: motorcycle.id, quantity: 1, color: pickedColor, userEmail: user.email, unitPrice: motorcycle.price}));
    return new swal({
      title: "Success",
      text: "You have added the motorcycle to your shopping cart",
      icon: "success",
      buttons: true,
    })
  }

  React.useEffect(() => {

    if (motorcycle && shoppingCart.some(el => el.id === motorcycle.id && el.color === pickedColor)) {
      setShoppingCartButton(false);
    } else setShoppingCartButton(true);

  }, [shoppingCart, motorcycle, pickedColor])

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
              <p style={{ fontWeight: '700'}}>Price:</p>
              <h4>${motorcycle.price}</h4>
            </div>

            <div>
              <label onClick={() => motorcycle && motorcycle.stock > 0 && isAuthenticated && user && handleDispatch()} className={shoppingCartButton && motorcycle.stock > 0 && isAuthenticated && pickedColor ? styles['cart-container'] : styles['cart-container-disabled']}>
                Add to cart 
                <ion-icon style={{ color: "#fff "}} className='svg' size="small" name="cart-outline"></ion-icon>
              </label>
            </div>
          </div>
          <div className={styles['color-container']}>
            <div className={styles['color']} >
              <p style={{ fontWeight: '700'}}>Pick a color:</p>
              {
                colors.map(el => (
                  <div onClick={() => setPickedColor(el.toLowerCase())} style={{ width: '20px', height: '20px', background: `${el.toLowerCase()}`, cursor: 'pointer', boxShadow: pickedColor === el.toLowerCase() ? 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset' : ''}}></div>
                ))
              }
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
            {/* <p>Color options: {colors?.map(c => <p>{c}</p>)}</p> */}
          </div>
        </div>
      </div>
    </article>
  );
}
