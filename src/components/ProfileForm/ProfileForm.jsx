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

   useEffect(() => {
    if(!isAuthenticated) navigate("/")
    else{axios.get(`${process.env.REACT_APP_HOST_NAME}/users/${user?.sub}`)
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

  return (

    
      <div className={styles.ProfileForm}>
        <section>
          <form>
            <h1>Profile Account</h1>
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

            <Link to="/" ><button className={styles.homeBtn}>Home</button></Link>
          </section>
        </form>
      </section>

    </div>
  );
}


