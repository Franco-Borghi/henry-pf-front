import axios from 'axios';
import React from 'react';
import swal from 'sweetalert2';
import styles from './Orders.module.scss';
import { useNavigate } from 'react-router-dom';
import { convertirNumero } from '../../../utils';

export function OrderRow({order, getOrders}) {

  const [edit, setEdit] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(order.orderNumber);
  const [orderStatus, setOrderStatus] = React.useState(order.orderStatus);
  const [userId, setUserId] = React.useState(order.userId);
  const [amountPaid, setAmountPaid] = React.useState(order.amountPaid);
  const [date, setDate] = React.useState(order.date);
  const [items, setItems] = React.useState(order.items);
  const navigate = useNavigate();

  const handlePut = () => {
    axios.put(`${process.env.REACT_APP_HOST_NAME}/order`, {
      orderStatus, 
      orderNumber
    })
    .then(() => {
      getOrders();
    })
    .then(res => {
      return new swal({
        title: "Success",
        text: "The order was successfully edited",
        icon: "success",
        buttons: true,
      })
    })
    .catch(err => {
      return new swal({
        title: "Error",
        text: "There was an error updating the order",
        icon: "error",
        buttons: true,
      })
    })
  }

  const refreshState = () => {
    setOrderNumber(order.orderNumber);
    setOrderStatus(order.orderStatus);
    setUserId(order.userId);
    setAmountPaid(order.amountPaid);
    setDate(order.date);
    setItems(order.items);
  }

  return (
    <tr className={!edit ? styles.tr : styles['tr-true']}>
      {
        edit
        ? <>
            <td className={styles.td}>{`${order.orderNumber}`}</td>
            <td className={styles.td}>
              <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                <option value="Completed">Completed</option>
                {/* <option value="Cancelled">Cancelled</option> */}
                <option value="Delivered">Delivered</option>
              </select>
            </td>
            <td className={styles.td}>{`${order.userId}`}</td> 
            <td className={styles.td}>{`${order.date}`}</td>
            <td className={styles.td}>{`${order.items.length}`}</td>
            <td className={styles.td}>{`$USD ${convertirNumero(order.amountPaid)}`}</td>
          </>
        : <>
            <td className={styles.td}>{`${order.orderNumber}`}</td>
            <td className={styles.td}>{`${order.orderStatus}`}</td>
            <td className={styles.td}>{`${order.userId}`}</td>
            <td className={styles.td}>{`${order.date}`}</td>
            <td className={styles.td}>{`${order.items.length}`}</td>
            <td className={styles.td}>{`$USD ${convertirNumero(order.amountPaid)}`}</td>
          </>
      }   
      <td style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px'}} className={styles.td}>
        {
          edit
          ? <>
              <button className={styles.save} onClick={() => {handlePut(); setEdit(false)}} type='button'>Save</button>
              <button className={styles.cancel} onClick={() => {refreshState(); setEdit(false)}} type='button'>Cancel</button>
            </>
          : <>
              <button className={styles.edit} onClick={() => setEdit(true)} type='button'>Edit</button>
              <button className={styles.view} onClick={() => navigate(`/admin/order/${order.orderNumber}`)} type='button'>View Order</button>
            </>
        }
      </td>
    </tr>
  )
}
