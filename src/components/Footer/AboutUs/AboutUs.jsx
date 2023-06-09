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
      <div className={styles.contentWrapper}>
        <img
          src={imgAbout}
          alt="DINAMO"
          className={styles.aboutUsImage}
        />
        <div className={styles.rightContent}>
          <h3>WITH DINAMO YOU GET:</h3>
          <ul>
            <li>WARRANTY</li>
            <li>FINANCING</li>
            <li>SERVICES</li>
          </ul>
        </div>
      </div>
      <h3>MISSION</h3>
      <p>
      "To be an innovative mexican company, committed to its customers, offering affordable Motorcycles with guaranteed support."
      </p>
      <h3>VISION</h3>
      <p>
      "To have the largest, profitable, and efficient distribution and
        service network of mexican brand Motorcycles in latin america."
      </p>
      <h3>VALUES</h3>
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

