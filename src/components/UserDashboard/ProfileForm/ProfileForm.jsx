import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./ProfileForm.module.scss";
import Review from '../Reviews/Review';
import PersonalData from '../PersonalData/PersonalData';
import OrdersProfile from '../OrdersProfile/OrdersProfile';
import validateProfile from './validate';
import { useDispatch } from 'react-redux';
import { getUserById } from '../../../redux/actions';

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState();
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate()
  const mySwal = withReactContent(Swal);
  const [orders, setOrders] = useState(false);
  const [profile, setProfile] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();

   useEffect(() => {
    if(!isAuthenticated) navigate("/")
    else{
      if(!editMode){
      axios.get(`${process.env.REACT_APP_HOST_NAME}/orders/${user?.sub}`)
    .then(res => {
      setProfileData(res.data)
   }) 
   .catch(err => console.log("ERROR", err))
  }
}
  }, [user?.sub], editMode)

  const handleOrders = () => {
    setProfile(false);
    setOrders(true);
    setReviews(false)
  }

  const handleProfile = () => {
    setOrders(false);
    setProfile(true);
    setReviews(false)
  }

  const handleReviews = () => {
    setOrders(false);
    setProfile(false);
    setReviews(true);
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
    const auxErrors = validateProfile(profileData)
    if(Object.keys(auxErrors).length === 0){
    setEditMode(false);
    setErrors({})
    console.log(profileData);
    if (profileData.idNumber === "") profileData.idNumber = null
    axios.put(`${process.env.REACT_APP_HOST_NAME}/users/${user?.sub}`, { ...profileData })
      .then(() => {
        dispatch(getUserById(user.sub));
      })
      .then(() => {
        mySwal.fire({
          html: <strong>The info has been updated</strong>,
          icon: "success",
        })
      }).catch(err => console.log("ERROR", err))
    }else{
      setErrors(auxErrors)
      mySwal.fire({
        html: <strong>There are some incorrect fields, check the errors and try again</strong>,
        icon: "warning",
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.ProfileForm}>
        <h2>PROFILE ACCOUNT</h2>
      <div className={styles['selector-container']}>
          <div className={styles['selector']}>
            <h4 onClick={handleProfile} className={styles[`${profile}`]}>Personal Data</h4>
            <h4 onClick={handleOrders} className={styles[`${orders}`]}>Orders</h4>
            <h4 onClick={handleReviews} className={styles[`${reviews}`]}>Reviews</h4>
          </div>
          <div data-visible={`${profile}`} className={styles[`selector-content`]}>
            <PersonalData errors={errors} profileData={profileData} handleEditClick={handleEditClick} handleInputChange={handleInputChange} handleSaveClick={handleSaveClick} editMode={editMode}/>
          </div>
          <div data-visible={`${orders}`} className={styles[`selector-content`]}>
            <OrdersProfile selectedOrders={selectedOrders} profileData={profileData} toggleItems={toggleItems} />
          </div>
          <div style={{ overflowX: 'scroll' }} data-visible={`${reviews}`} className={styles[`selector-content`]}>
            <Review orders={profileData?.orders} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}


