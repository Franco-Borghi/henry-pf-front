import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFoundPage.scss";

export const NotFoundPage = () => {
  return (
    <div className="not-found-page__container" style={{ width: "100vw", padding: "25px", minHeight: "100vh"}}>
        <div className='card' style={{ display: "flex", flexDirection: "column", backgroundColor: "#282828", padding: "25px", width: "100%", maxWidth:"600px"}}>
            <h1>Error 404 - Not Found</h1>
            <p>
                The page you are looking for could not be found.
                <br />
                <br />
                Please check the URL or go back to the{' '}
                <Link to="/">homepage</Link>.
                <br />
                <br />
                If you believe this is a mistake or need further assistance, please contact our support team at{' '}
                <a href="mailto:motos@dinamo.com.mx">motos@dinamo.com.mx</a>
            </p>        
        </div>
    </div>
  )
}
