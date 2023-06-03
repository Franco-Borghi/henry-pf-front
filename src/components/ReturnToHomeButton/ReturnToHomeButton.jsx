import React from 'react'
import styles from "./ReturnToHomeButton.module.scss"
import { useNavigate } from 'react-router-dom';



export default function ReturnToHomeButton() {

    const navigate = useNavigate();

  return (
    <div className={styles['return-to-home-button']} onClick={() => navigate("/")}>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.92388 0.444458L0 5.8889L5.92388 11.3333L7.39161 9.9844L2.93547 5.8889L7.39161 1.79341L5.92388 0.444458Z" fill="#000"/>
            </svg>
          <p>Return to Home</p>
        </div>
  )
}
