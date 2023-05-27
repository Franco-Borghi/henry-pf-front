import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function ProfileForm() {
   const [editMode, setEditMode] = useState(false);
   const [profileData, setProfileData] = useState();
   const {user} = useAuth0();

   useEffect(() => {
    axios.get(`http://localhost:3001/users/${user.sub}`)
    .then(res => {
      setProfileData(res.data)
      console.log(res.data)
   }) })


    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
   };

    const handleEditClick = () => {
    setEditMode(true);
   };

   const handleSaveClick = () => {
     setEditMode(false);
   };
   
   

  return (
    <div>
      <h1>Profile Account</h1>
      <div>
        <label>
          Name:
          {editMode ? (
            <input
              type="text"
              name="name"
              value={profileData.firstName}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.firstName}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Lastname:
          {editMode ? (
            <input
              type="email"
              name="email"
              value={profileData.lastName}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.lastName}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          {editMode ? (
            <input
              type="tel"
              name="phone"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.phoneNumber}</span>
          )}
        </label>
      </div>
      {/* <div>
        <label>
          Id Number:
          {editMode ? (
            <input
              type="text"
              name="address"
              value={profileData.idNumber}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.idNumber}</span>
          )}
        </label>
      </div> */}
      
      
      <div>
        {editMode ? (
          <button onClick={handleSaveClick}>Guardar</button>
        ) : (
          <button onClick={handleEditClick}>Editar</button>
        )}
      </div>
    </div>
  );
}


