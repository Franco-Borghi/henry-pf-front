import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfileForm() {
   const [editMode, setEditMode] = useState(false);
   const [profileData, setProfileData] = useState();
   const {user, isAuthenticated} = useAuth0();
   const navigate = useNavigate()
   const mySwal= withReactContent(Swal);

   useEffect(() => {
    if(!isAuthenticated) navigate("/")
    else{axios.get(`http://localhost:3001/users/${user?.sub}`)
    .then(res => {
      setProfileData(res.data)
   }) 
   .catch(err => console.log("ERROR", err))
  }
  }, [user?.sub])


    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
   };

    const handleEditClick = () => {
    setEditMode(true);
   };

   const handleSaveClick = () => {
     setEditMode(false);
     console.log(profileData);
     if(profileData.idNumber === "") profileData.idNumber = null
     axios.put(`http://localhost:3001/users/${user?.sub}`, {...profileData})
     .then(d => {
      setProfileData(d.data)
      mySwal.fire({
        html: <strong>The info has been updated</strong>,
        icon: "success",
    })
    }).catch(err => console.log("ERROR", err))
  }
   
  return (

    <div>
      <h1>Profile Account</h1>
      <div>
      <label>
          Email:
            <input
              type="text"
              disabled
              value={profileData?.email}
            />
        </label>
      </div>
      <div>
        <label>
        First Name:
          {editMode ? (
            <input
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
        <label>
          Last Name:
          {editMode ? (
            <input
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
            <input
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
        <label>
          ID Number:
          {editMode ? (
            <input
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
      
      
      <div>
        {editMode ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}

<Link to="/" ><button>Home</button></Link>
      </div>
    </div>
  );
}


