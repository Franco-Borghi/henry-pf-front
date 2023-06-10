import React from 'react';
import styles from './Order.module.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { convertirNumero } from '../../../utils';
import ReactToPrint from 'react-to-print';

export const Order = () => {

  const [order, setOrder] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const { id } = useParams();
  const canvas = React.useRef(null)

  const getOrder = () => {
    axios.get(`${process.env.REACT_APP_HOST_NAME}/orders/?id=${id}`)
    .then(response => setOrder(response.data))
  }

  React.useEffect(() => {
    getOrder()
  }, [])

  React.useEffect(() => {
    if (order) {
      const totalAmount = order.items.reduce((container, el) => container + el.motorcycle.price, 0);
      setTotal(totalAmount);
    }
  }, [order])

  const orderContainerStyles = {
    padding: '40px',
    paddingTop: '40px',
    width: '-webkit-fill-available',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  }

  const orderStyles = {
    width: '100%',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    border: '1px solid #000',
  }

  const headerStyles = {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
  }

  const tdThStyles = {
    border: '1px solid #7e7e7e',
    padding: '10px',
  }
  
  const orderFooterStyles = {
    paddingTop: '40px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px 25px',
  }

  const spanStyles = {
    display: 'flex',
    width: '200px',
    borderBottom: '1px solid #000',
    height: '1px',
  }

  return (
    <div style={orderContainerStyles}>
      <div className={styles.print}>
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => canvas.current}
          documentTitle='title'
        />
      </div>
      <div ref={canvas} style={orderStyles}>
        <h2 style={{ textAlign: 'center', fontWeight: '700' }}>Purchase order</h2>
        <div style={headerStyles}>
          <p>Supplier name: Dinamo Motorcycles</p>
          <p>Buyer name: {order && order.user.firstName && order.user.lastName && `${order.user.firstName} ${order.user.lastName}` || 'Buyer name missing'}</p>
          <p>Order no.: {order && order.orderNumber}</p>
          <p>Buyer email: {order && order.user.email}</p>
          <p>Order date: {order && order.date}</p>
          <p>Buyer ID: {order && order.user.idNumber || 'Buyer ID missing'}</p>
        </div>
        <table style={{ border: '1px solid #7e7e7e', borderCollapse: 'collapse'}}>
          <thead style={{ backgroundColor: '#c7c7c7' }}>
            <tr>
              <th style={tdThStyles}>Item</th>
              <th style={tdThStyles}>Description</th>
              <th style={tdThStyles}>Unit price</th>
              <th style={tdThStyles}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              order
              ? order.items.map((el, i) => {
                return  <tr key={i}>
                          <td style={tdThStyles}>{el.chassisId}</td>
                          <td style={tdThStyles}>{`${el.motorcycle.brand} ${el.motorcycle.model}, color: ${el.color}`}</td>
                          <td style={tdThStyles}>{'$USD ' + convertirNumero(el.motorcycle.price)}</td>
                          <td style={tdThStyles}>-</td>
                        </tr>
              })
              : null
            }
            {
              order && order.items.length < 5 
              ? Array.from({length: 4}).map(el => (
                <tr style={{ height: '40.5px'}}>
                  <td style={tdThStyles}></td>
                  <td style={tdThStyles}></td>
                  <td style={tdThStyles}></td>
                  <td style={tdThStyles}></td>
                </tr>
              ))
              : null
            }
            <tr style={{ backgroundColor: '#c7c7c7' }}>
              <td style={tdThStyles}>Total</td>
              <td style={tdThStyles}></td>
              <td style={tdThStyles}></td>
              <td style={tdThStyles}>{total ? '$USD ' + convertirNumero(total) : null}</td>
            </tr>
          </tbody>
        </table>

        <div style={orderFooterStyles}>
          <p style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>Authrised by: <span style={spanStyles}></span></p>
          <p style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>Buyer's signature: <span style={spanStyles}></span></p>
          <p style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>Retirement date: <span style={spanStyles}></span></p>
          <p style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}></p>
        </div>

        <p>Thank you for choosing Dinamo Motorcycles! We appreciate your business and hope you enjoy your new ride. If you have any questions or need further assistance, please don't hesitate to contact us. Ride safe and have a great journey!</p>
      </div>
    </div>
  )
}
