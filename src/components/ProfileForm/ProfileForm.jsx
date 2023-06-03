import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./ProfileForm.module.css";

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState();
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate()
  const mySwal = withReactContent(Swal);
  const [orders, setOrders] = useState(false);
  const [profile, setProfile] = useState(true);

   useEffect(() => {
    if(!isAuthenticated) navigate("/")
    else{axios.get(`${process.env.REACT_APP_HOST_NAME}/orders/${user?.sub}`)
    .then(res => {
      setProfileData(res.data)
      console.log(res.data);
   }) 
   .catch(err => console.log("ERROR", err))
  }
  }, [user?.sub])

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


  const handleSaveClick = (e) => {
    e.preventDefault()
    setEditMode(false);
    console.log(profileData);
    if (profileData.idNumber === "") profileData.idNumber = null
    axios.put(`${process.env.REACT_APP_HOST_NAME}/users/${user?.sub}`, { ...profileData })
      .then(d => {
        setProfileData(d.data)
        mySwal.fire({
          html: <strong>The info has been updated</strong>,
          icon: "success",
        })
      }).catch(err => console.log("ERROR", err))
  }

  // TODO: Modificar algo, cuando se actualizan los campos del usuario, se borran las ordenes

  return (

    
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
              <ul>
                  {profileData?.orders? profileData.orders.map((o, i) => 
                    <li>
                      <div>
                        <p>Order Number: {o?.orderNumber}</p>
                        <p>Date: {o?.date}</p>
                        <p>Amount: ${o?.amountPaid}</p>
                        <p>Items:</p>
                        <table>
                            <thead>
                              <tr>
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
                            {o?.items?.map(i => {
                          return <tr>
                          <td>{i?.motorcycle?.brand}</td>
                          <td>{i?.motorcycle?.model}</td>
                          <td>{i?.motorcycle?.transmission}</td>
                          <td>{i?.motorcycle?.cc}</td>
                          <td>{i?.motorcycle?.year}</td>
                          <td>{i?.color}</td>
                          <td>{i?.motorcycle?.price}</td>
                          </tr>
                        })}
                            </tbody>
                          </table>
                      </div>
                    </li>
                  ): <h4>You don't have any orders</h4>}
                  </ul> 
          </div>
        </div>
        <Link to="/" ><button className={styles.homeBtn}>Home</button></Link>
    </div>
  );
}


