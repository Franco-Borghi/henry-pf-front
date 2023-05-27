import React from 'react';
import styles from './ShoppingCartCard.module.scss';
import { deleteItemFromCart, updateCartItemQuantity } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';


export function ShoppingCartCard({el}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const allMotorcycles = useSelector(state => state.allMotorcycles);
  const [motorcycleDetails, setMotorcycleDetails] = React.useState(null);

  console.log("el", el)

  const validateStock = (number) => {
    const motorcycle = allMotorcycles.find(motorcycle => motorcycle.id === el.id);
    let colorStock = 0;
    motorcycle.items.forEach(element => {
      if (element.color.toLowerCase() === el.color.toLowerCase()) {
        colorStock++;
      }
    });

    if (!(colorStock > number)) {
      new swal({
        title: "Stock limit reached",
        text: "It is not possible to add more units of this product",
        icon: "warning",
        buttons: true,
      })
    }

    return colorStock > number;
  }

  function convertirNumero(numero) {
    // Convertir el número a string
    let numeroString = numero.toString();
  
    // Verificar si el número tiene parte decimal
    if (numeroString.includes('.')) {
      // Dividir el número en parte entera y parte decimal
      let partes = numeroString.split('.');
      
      // Formatear la parte entera
      let parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
      // Combinar la parte entera formateada con la parte decimal
      let resultado = parteEntera + ',' + partes[1];
      
      return resultado;
    } else {
      // Formatear el número entero
      let numeroFormateado = numeroString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
      return numeroFormateado;
    }
  }

  React.useEffect(() => {
    const motorcycle = allMotorcycles.find(element => element.id === el.id);
    setMotorcycleDetails(motorcycle);
  }, []);

  if (motorcycleDetails) {
    return (
      <div className={styles.container}>
        <img onClick={() => navigate(`/${el.id}`)} src={motorcycleDetails.image} alt="Item image" />
        <div className={styles['main-container']}>
          <div className={styles['info-container']}>
            <div>
              <p>{motorcycleDetails.category}</p>
              <h3>{`${motorcycleDetails.brand} ${motorcycleDetails.model}`}</h3>
              <h4>{motorcycleDetails.year}</h4>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingBottom: '5px', borderBottom: `2px solid ${el.color}`, width: 'fit-content'}}>
              <p>Color: {el.color}</p>
              <div style={{ width: '20px', height: '20px', background: `${el.color}`, border: '1px solid black'}}></div>
            </div>

            <div className={styles['actions-container']}>
              <div className={styles['counter']}>
                <span onClick={() => el.quantity > 1 && dispatch(updateCartItemQuantity({id: el.id, quantity: -1, userEmail: user.email, color: el.color}))} style={{cursor: 'pointer'}}>-</span>
                <span>{`${el.quantity}`}</span>
                <span onClick={() => validateStock(el.quantity) && dispatch(updateCartItemQuantity({id: el.id, quantity: 1, userEmail: user.email, color: el.color}))} style={{cursor: 'pointer'}}>+</span>
              </div>
              <div onClick={() => dispatch(deleteItemFromCart(el))} className={styles['delete']}>
              <svg style={{color: "#ff3300"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="#ff3300"></path> <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="#ff3300"></path> </svg>
              <p style={{ color: '#ff3300', cursor: 'pointer' }}>Delete</p>
              </div>
            </div>
          </div>

          <div className={styles.price}>
            <p>Price:</p>
            <h4>{'$USD ' + convertirNumero(motorcycleDetails.price)}</h4>
          </div>
        </div>
      </div>
    )
  }
}
