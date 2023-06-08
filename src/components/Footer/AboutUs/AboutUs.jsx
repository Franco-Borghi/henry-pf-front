import React from "react";
import styles from "./AboutUs.module.css";
import imgAbout from "../img-about.jpg";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <h2>MOVE ON A MOTORCYCLE, MOVE WITH DINAMO</h2>
      
      <p>
        Our experience, products, and services, the quality we offer,
        our assembly plant, as well as the recognition and respect that
        the DINAMO brand has earned over the years, back us up and strengthen us.
      </p>
      <p>
        We want your experience with DINAMO to be highly satisfying and for
        you to feel proud to be part of this great brand. We are a 100%
        Mexican company and we are always committed to constant innovation.
        Our extensive network of agencies throughout Mexico provides you with
        professional service, with trained and dedicated service agents.
      </p>
      <img
        src={imgAbout}
        alt="DINAMO"
        className={styles.aboutUsImage}
      />
      <h4>WITH DINAMO YOU GET:</h4>
      <ul>
        <li>WARRANTY</li>
        <li>FINANCING</li>
        <li>SERVICES</li>
      </ul>
      <h4>MISSION</h4>
      <p>
        "TO BE AN INNOVATIVE MEXICAN COMPANY, COMMITTED TO ITS CUSTOMERS,
        OFFERING AFFORDABLE MOTORCYCLES WITH GUARANTEED SUPPORT."
      </p>
      <h4>VISION</h4>
      <p>
        "TO HAVE THE LARGEST, PROFITABLE, AND EFFICIENT DISTRIBUTION AND
        SERVICE NETWORK OF MEXICAN BRAND MOTORCYCLES IN LATIN AMERICA."
      </p>
      <h4>VALUES</h4>
      <ul>
        <li>OUR PEOPLE</li>
        <li>PRODUCT</li>
        <li>INNOVATION</li>
        <li>PROFITABILITY</li>
        <li>SOLIDITY</li>
      </ul>
    </div>
  );
};

export default AboutUs;
