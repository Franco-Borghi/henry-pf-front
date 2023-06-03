import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./ContactUs.module.css";


export default function ContactUs() {

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
  };



  return (
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

      <Link to='/'><button className={styles.homeButton}>Home</button></Link>
    </div>
    
  );
};

 
 