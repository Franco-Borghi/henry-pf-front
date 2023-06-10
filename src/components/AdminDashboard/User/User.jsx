import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './User.module.scss';
import swal from 'sweetalert2';
import { convertirNumero } from '../../../utils';

export const User = () => {

  const {id} = useParams();
  const [user, setUser] = React.useState(null);
  const [orders, setOrders] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [idNumber, setIdNumber] = React.useState(null);
  const [active, setActive] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const navigate = useNavigate();

  const getUser = () => {
    axios.get(`${process.env.REACT_APP_HOST_NAME}/users/${id}`)
    .then(response => setUser(response.data))
  }

  const getOrders = () => {
    axios.get(`${process.env.REACT_APP_HOST_NAME}/orders/${id}`)
    .then(response => {setOrders(response.data); console.log(response.data)})

  }

  const refreshState = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhoneNumber(user.phoneNumber);
    setIdNumber(user.idNumber);
    setActive(user.active);
    setRole(user.role);
  }

  const handlePut = () => {
    axios.put(`${process.env.REACT_APP_HOST_NAME}/users/${user.id}`, {
      // editedFromAdmin: true,
      firstName,
      lastName,
      phoneNumber,
      idNumber,
      active,
      role
    })
    .then(() => {
      getUser();
    })
    .then(res => {
      return new swal({
        title: "Success",
        text: "The user was successfully edited",
        icon: "success",
        buttons: true,
      })
    })
    .catch(err => {
      return new swal({
        title: "Error",
        text: "There was an error updating the user",
        icon: "error",
        buttons: true,
      })
    })
  }

  React.useEffect(() => {
    getUser();
    getOrders();
  }, [])

  React.useEffect(() => {
    if (user) {
      refreshState();
    }
  }, [user])

  if (user) {
    return (
      <div className={styles['user-container']}>
        <h2>User details</h2>
        <div className={styles['user-details']}>
          {
            edit && user.role !== 'admin'
            ? <div className={styles['absolute']}>
                <div className={styles["save-div"]}>
                  <button className={styles.save} onClick={() => {handlePut(); setEdit(false)}} type='button'>Save</button>
                  <button className={styles.cancel} onClick={() => {refreshState(); setEdit(false)}} type='button'>Cancel</button>
                </div>
              </div>
            : <label className={styles['absolute']} onClick={() => setEdit(true)}>
                Edit 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 20.0001H8L19.2929 8.7072C19.6834 8.31668 19.6834 7.68351 19.2929 7.29299L16.7071 4.7072C16.3166 4.31668 15.6834 4.31668 15.2929 4.7072L4 16.0001V20.0001Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8L16 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>
          }
          {
            edit
            ? <>
                <div><span>ID:</span> {user.id} </div>
                <div><span>First Name:</span><input placeholder='empty' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
                <div><span>Last Name:</span><input placeholder='empty' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
                <div><span>Email:</span> {user.email}</div>
                <div><span>Phone Number:</span><input placeholder='empty' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></div>
                <div><span>ID Number:</span><input placeholder='empty' type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} /></div>
                <div>
                  <span>Active:</span>
                  <select value={active} onChange={(e) => setActive(e.target.value === "true")}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                </div>
                <div><span>Role:</span>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="client">client</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </>
            : <>
                <div><span>ID:</span> {user.id} </div>
                <div><span>First Name:</span> {user.firstName || 'empty'}</div>
                <div><span>Last Name:</span> {user.lastName || 'empty'}</div>
                <div><span>Email:</span> {user.email}</div>
                <div><span>Phone Number:</span> {user.phoneNumber || 'empty'}</div>
                <div><span>ID Number:</span> {user.idNumber || 'empty'}</div>
                <div><span>Active:</span> {`${user.active}`}</div>
                <div><span>Role:</span> {user.role}</div>
              </>
          }

          <div className={styles['separator']}></div>

          <div className={styles['orders']}>
            <p>Orders:</p>
            {
              user && orders && orders.orders.length
              ? <div className={styles['total-orders']}>
                  {
                    orders.orders.map(el => (
                      <div onClick={() => navigate(`/admin/order/${el.orderNumber}`)} key={el.orderNumber} className={styles['single-order']}>
                        <p><span>Order number:</span> {el.orderNumber}</p>
                        <p><span>Order Status:</span> {el.orderStatus}</p>
                        <p><span>Amount Paid:</span> $USD {convertirNumero(el.amountPaid)}</p>
                      </div>
                    ))
                  }
                </div>
              : <div>no orders to show</div>
            }
          </div>
        </div>
      </div>
    )
  }
}
