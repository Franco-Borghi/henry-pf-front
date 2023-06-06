import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./ProfileForm.module.css";
import ReturnToHomeButton from '../ReturnToHomeButton/ReturnToHomeButton';

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState();
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate()
  const mySwal = withReactContent(Swal);
  const [orders, setOrders] = useState(false);
  const [profile, setProfile] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);

   useEffect(() => {
    if(!isAuthenticated) navigate("/")
    else{
      if(!editMode){
      axios.get(`${process.env.REACT_APP_HOST_NAME}/orders/${user?.sub}`)
    .then(res => {
      setProfileData(res.data)
      console.log(res.data);
   }) 
   .catch(err => console.log("ERROR", err))
  }
}
  }, [user?.sub], editMode)

  const handleProfile = () => {
    setProfile(false);
    setOrders(true);
  }

  const handleOrders = () => {
    setOrders(false);
    setProfile(true);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEditClick = (e) => {
    e.preventDefault()
    setEditMode(true);
  };


  const toggleItems = (orderNumber) => {
    if (selectedOrders.includes(orderNumber)) {
      setSelectedOrders(selectedOrders.filter(so => so !== orderNumber));
    } else {
      setSelectedOrders(selectedOrders.concat(orderNumber));
    }
  };

  const handleSaveClick = (e) => {
    e.preventDefault()
    setEditMode(false);
    console.log(profileData);
    if (profileData.idNumber === "") profileData.idNumber = null
    axios.put(`${process.env.REACT_APP_HOST_NAME}/users/${user?.sub}`, { ...profileData })
      .then(() => {
        mySwal.fire({
          html: <strong>The info has been updated</strong>,
          icon: "success",
        })
      }).catch(err => console.log("ERROR", err))
  }

  return (

    <div>
      <ReturnToHomeButton />
      <div className={styles.ProfileForm}>
        <h1>Profile Account</h1>
      <div className={styles['selector-container']}>
          <div className={styles['selector']}>
            <h4 onClick={handleOrders} className={styles[`${profile}`]}>Personal Data</h4>
            <h4 onClick={handleProfile} className={styles[`${orders}`]}>Orders</h4>
          </div>
          <div data-visible={`${profile}`} className={styles[`selector-content`]}>
          <section>
          <form>
            <div >
              <label>
                Email:
                <input className={styles.inputField}
                  type="text"
                  disabled
                  value={profileData?.email}
                />
              </label>
            </div>
  
            <div>
              <label >
                First Name:
                {editMode ? (
                  <input className={styles.inputField}
                    type="text"
                    name="firstName"
                    value={profileData?.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{profileData?.firstName}</span>
                )}
              </label>
            </div>
  
            <div>
              <label >
                Last Name:
                {editMode ? (
                  <input className={styles.inputField}
                    type="text"
                    name="lastName"
                    value={profileData?.lastName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{profileData?.lastName}</span>
                )}
              </label>
            </div>
  
            <div>
              <label>
                Phone Number:
                {editMode ? (
                  <input className={styles.inputField}
                    type="tel"
                    name="phoneNumber"
                    value={profileData?.phoneNumber}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{profileData?.phoneNumber}</span>
                )}
              </label>
            </div>
  
            <div>
              <label >
                ID Number:
                {editMode ? (
                  <input className={styles.inputField}
                    type="text"
                    name="idNumber"
                    value={profileData?.idNumber}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{profileData?.idNumber}</span>
                )}
              </label>
            </div>
        


          <section>
            {editMode ? (
              <button className={styles.saveBtn} onClick={handleSaveClick}>Save</button>
            ) : (
              <button className={styles.editBtn} onClick={handleEditClick}>Edit</button>
            )}
          </section>
        </form>
      </section>
          </div>
          <div data-visible={`${orders}`} className={styles[`selector-content`]}>
          <ul className={styles['orders-list']}>
        {profileData?.orders ? (
          profileData.orders.map((o) => (
            <li className={styles['order-item']}>
              <div>
                <p className={styles['order-info']}>Order Number: {o?.orderNumber}</p>
                <p className={styles['order-info']}>Date: {o?.date}</p>
                <p className={styles['order-info']}>Amount: ${o?.amountPaid}</p>
                <p
                  onClick={() => toggleItems(o.orderNumber)}
                  className={styles['order-details-toggle']}
                >
                  Details:
                </p>
                {selectedOrders.includes(o.orderNumber) && (
                  <table className={styles['order-details-table']}>
                    <thead>
                      <tr className={styles['order-item-row']}>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Transmission</th>
                        <th>CC</th>
                        <th>Year</th>
                        <th>Color</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {o?.items?.map((item, index) => (
                        <tr className={styles['order-item-row']} key={index}>
                          <td>{item?.motorcycle?.brand}</td>
                          <td>{item?.motorcycle?.model}</td>
                          <td>{item?.motorcycle?.transmission}</td>
                          <td>{item?.motorcycle?.cc}</td>
                          <td>{item?.motorcycle?.year}</td>
                          <td>{item?.color}</td>
                          <td>{item?.motorcycle?.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </li>
          ))
        ) : (
          <h4 className={styles['no-orders-message']}>You don't have any orders</h4>
        )}
      </ul>
            </div>
              </div>
    </div>
    </div>
  );
}


