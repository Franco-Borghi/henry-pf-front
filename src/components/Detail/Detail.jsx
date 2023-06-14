import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './Detail.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addItemToFavs, deleteItemFromFavs } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import swal from 'sweetalert2';
import { convertirNumero } from '../../utils';
import { Rating } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';


export default function Detail() {
  const [motorcycle, setMotorcycle] = useState(null);
  const reduxUser = useSelector(state => state.user);
  const allMotorcycles = useSelector(state => state.allMotorcycles);
  const favourites = useSelector(state => state.favourites);
  const [colors, setColors] = useState([]);
  const [pickedColor, setPickedColor] = useState(null);
  const { id } = useParams();
  const [description, setDescription] = React.useState(true);
  const [details, setDetails] = React.useState(false);
  const [shoppingCartButton, setShoppingCartButton] = React.useState(false);
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [stock, setStock] = React.useState(true);
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState([])
  const [item, setItem] = React.useState(null);
  const mySwal= withReactContent(Swal);

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
    if (!stock) {
      return false;
    }

    if (!isAuthenticated) {
      return new swal({
        title: "Please login",
        text: "You need to login to add items to the shopping cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          loginWithRedirect();
        }
      });      
    }
    
    if (reduxUser && reduxUser.role === 'admin') {
      return new swal({
        title: "Error",
        text: "Admins can't make purchases",
        icon: "error",
        buttons: true,
      })
    }

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

  const handleFavourites = () => {
    if (!isAuthenticated) {
      return new swal({
        title: "Please login",
        text: "You need to login to add items to favourites",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          loginWithRedirect();
        }
      });      
    }
    
    if (reduxUser && reduxUser.role === 'admin') {
      return new swal({
        title: "Error",
        text: "Admins can't add to favourites",
        icon: "error",
        buttons: true,
      })
    }
    
    if (JSON.stringify(favourites).includes(JSON.stringify(item))) {
      dispatch(deleteItemFromFavs(item));
    } 
    else dispatch(addItemToFavs(item));
  }

  const showReviews = () => {
    mySwal.fire({
      title: "Reviews",
      icon: "info",
      html: <div>
        {reviews?.map(r => {
          return <div> 
            <Rating readOnly value={r.rating} />
            <p>{r.comment}</p>
            <hr />
          </div>
        })}
      </div>
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
        const response = await axios.get(`${process.env.REACT_APP_HOST_NAME}/motorcycles/${id}`);
        setMotorcycle(response.data);
        let auxColors = []
        response.data.items.forEach(i => {if(!auxColors.includes(i.color)) auxColors.push(i.color)
        setColors(auxColors)
        })
      } catch (error) {
        console.log(error);
      }

      axios.get(`${process.env.REACT_APP_HOST_NAME}/reviews/motorcycles/${id}`)
      .then(d => {
        setReviews(d.data)
        if(d.data.length > 0) {let total = 0;
        d.data.forEach(r => total += r.rating)
        setRating(Math.ceil(total/d.data.length))}
      })
    };
    fetchMotorcycle();
  }, [id]);

  React.useEffect(() => {
    if (motorcycle) {
      setStock(allMotorcycles.some(moto => moto.id === motorcycle.id && moto.items.some(item => item.sold === false)))
    }
  }, [motorcycle])

  React.useEffect(() => {
    if (motorcycle && user) {
      setItem({
        id: motorcycle.id,
        brand: motorcycle.brand,
        model: motorcycle.model,
        year: motorcycle.year,
        cc: motorcycle.cc,
        transmission: motorcycle.transmission,
        description: motorcycle.description,
        image: motorcycle.image,
        price: motorcycle.price,
        category: motorcycle.category,
        userEmail: user.email,
      })
    }
  }, [motorcycle, user])

  if (!motorcycle) {
    return <div>Searching...</div>;
  }

  return (
    
    <>
   
    <article className={styles['detail-container']}>
      {
        !stock
        ? <h1>Item out of stock</h1>
        : null
      }
      {
        user && item && favourites && favourites.length && JSON.stringify(favourites).includes(JSON.stringify(item))
        ? <div onClick={(handleFavourites)} className={styles["heart-container"]}>
            <ion-icon style={{ color: 'red', fontSize: '25px' }} name="heart"></ion-icon>
          </div>
        : <div onClick={(handleFavourites)} className={styles["heart-container"]}>
            <ion-icon style={{ color: window.innerWidth < 1024 ? 'black' : 'white', fontSize: '25px' }} name="heart-outline"></ion-icon>
          </div>
      }
      <div style={{ opacity: stock ? '1' : '0.5'}} className={styles['img-container']}>
        <img src={motorcycle.image} alt='product-image' />
      </div>
      <div style={{ opacity: stock ? '1' : '0.5'}} className={styles['detail']}>
        <div>
          <div className={styles['title-container']}>
            <p>{motorcycle.category}</p>
            <h1>{motorcycle.brand} {motorcycle.model}</h1>
            <h3>{motorcycle.year}</h3>
            {rating !== null ? 
            <>
            <Rating
            name="read-only-detail"
            value={rating}
            readOnly
            size="large"
          /><p style={{ fontWeight: '700'}} onClick={showReviews}>Reviews</p>
          </>
          : null }
          </div>
          <div className={styles['separator']}></div>
          <div className={styles['price-container']}>
            <div>
              <p style={{ fontWeight: '700'}}>Price:</p>
              <h4>$USD {convertirNumero(motorcycle.price)}</h4>
            </div>

            <div>
              <label onClick={() => motorcycle && motorcycle.stock > 0 && handleDispatch()} className={shoppingCartButton && motorcycle.stock > 0 && isAuthenticated && pickedColor && reduxUser && reduxUser.role !== 'admin' ? styles['cart-container'] : styles['cart-container-disabled']}>
                Add to cart 
                <ion-icon style={{ color: "#000 "}} className='svg' size="small" name="cart-outline"></ion-icon>
              </label>
            </div>
          </div>

          <div className={styles['color-container']}>
            <div className={styles['color']} >
              {
                stock
                ? <p style={{ fontWeight: '700'}}>Pick a color:</p>
                : <p style={{ fontWeight: '700'}}>Item out of stock</p>
              }

              {
                colors.map(el => (
                  allMotorcycles.some(moto => moto.id === motorcycle.id && moto.items.some(item => item.sold === false && item.color === el ))
                  ? <div onClick={() => setPickedColor(el.toLowerCase())} style={{border: '1px solid #c7c7c7', width: '20px', height: '20px', background: `${el.toLowerCase()}`, cursor: 'pointer', boxShadow: pickedColor === el.toLowerCase() ? 'rgba(255, 255, 255, 1) 0px 0px 0px 1px, rgba(255, 255, 255, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset' : ''}}></div>
                  :  null
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
    
    
    </>
  );
}
