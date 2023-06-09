import React from 'react'
import { useState } from 'react';
import styles from "./ContactUs.module.scss";
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

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
    axios.post(`${process.env.REACT_APP_HOST_NAME}/email`, { destination: 'motorcyclesdinamo@gmail.com', body: `Nombre: ${formState.firstName}\n\nApellido: ${formState.lastName}\n\nEmail: ${formState.email}\n\n${formState.message}`, title: formState.subject} )
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
    <div className={styles.contactUsContainer}>
      <div className={styles['my-form-box']}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <h2>CONTACT US</h2>
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
    </div>
  );
};

 
 