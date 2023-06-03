import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./ContactUs.module.css";
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import ReturnToHomeButton from '../ReturnToHomeButton/ReturnToHomeButton';




export default function ContactUs() {

const mySwal = withReactContent(Swal);
const navigate = useNavigate()


  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_HOST_NAME}/email`, { destination: 'motorcyclesdinamo@gmail.com', body: formState.message, title: formState.subject} )
        .then(d => {
            mySwal.fire({
                html: <strong>The email has been sent. We will contact you soon!</strong>,
                icon: "success",
              })
              .then (navigate('/'))
        
            }

        ).catch(err => console.log("ERROR", err))


  };



  return (
    <div>
          <ReturnToHomeButton />
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <label className={styles.formLabel}>
          Name:
          <input type="text" name="firstName" value={formState.firstName} onChange={handleChange} className={styles.formInput} required />
        </label>

        <label className={styles.formLabel}>
          Last Name:
          <input type="text" name="lastName" value={formState.lastName} onChange={handleChange} className={styles.formInput} required />
        </label>

        <label className={styles.formLabel}>
          Email:
          <input type="email" name="email" value={formState.email} onChange={handleChange} className={styles.formInput} required />
        </label>

        <label className={styles.formLabel}>
          Subject:
          <input type="text" name="subject" value={formState.subject} onChange={handleChange} className={styles.formInput} required />
        </label>

        <label className={styles.formLabel}>
          Message:
          <textarea name="message" value={formState.message} onChange={handleChange} className={styles.formTextarea} required />
        </label>

        <input type="submit" value="Send" className={styles.formSubmit} />
      </form>

    

    </div>
    </div>


    
  );
};

 
 