import React from "react";
import styles from "./AboutUs.module.css";
import imgAbout from "../img-about.jpg";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <h1>MOVE ON A MOTORCYCLE, MOVE WITH DINAMO</h1>
      
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
  <img src={imgAbout} alt="DINAMO" className={styles.aboutUsImage} />
  <div className={styles.rightContent}>
  <h3>WITH DINAMO YOU GET:</h3>
<ul>
  <li>WARRANTY: peace of mind with our warranty coverage</li>
  <li>FINANCING: flexible financing options</li>
  <li>SERVICES: professional and dedicated services</li>
  <li>QUALITY PRODUCTS: high-quality and reliable products</li>
  <li>RELIABLE PERFORMANCE: consistent and dependable performance</li>
  <li>VERSATILE MODELS FOR EVERY NEED: versatile models to meet every requirement</li>
  <li>ACCESSORIES AND SPARE PARTS: comprehensive range of accessories and spare parts</li>
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
      <ul className={`${styles.values} ${styles.list}`}>
  <li>OUR PEOPLE</li>
  <li>PRODUCT</li>
  <li>INNOVATION</li>
  <li>PROFITABILITY</li>
  <li>SOLIDITY</li>
</ul>
<h3>FIND US!</h3>
      <div className={styles.mapContainer}>
        <iframe
          title="DINAMO Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0.0000001!2d-99.133221!3d19.432779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fc30b84d6991%3A0x68a4f93c697f288b!2sDINAMO%20Location!5e0!3m2!1sen!2sus!4v1630481448132!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutUs;

