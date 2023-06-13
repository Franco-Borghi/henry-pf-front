import React, { useEffect } from "react";
import styles from "./AboutUs.module.scss";
import imgAbout from "../img-about.jpg";
import { animateElements } from "../../../utils";

const AboutUs = () => {
  useEffect(() => {
    animateElements(["right-content"], "bottom", true);
    animateElements(["image"], "top", true);
    animateElements(["first-card", "third-card"], "left", true);
    animateElements(["second-card"], "right", true);
  }, []);

  return (
    <div style={{ background: '#000' }}>
      <div className={styles.aboutUs}>
        <h1>MOVE ON A MOTORCYCLE, MOVE WITH DINAMO</h1>
        <p>
          Our experience, products, and services, the quality we offer, our assembly plant, as well as the recognition and respect that the DINAMO brand has earned over the years, back us up and strengthen us.
        </p>
        <p>
          We want your experience with DINAMO to be highly satisfying and for you to feel proud to be part of this great brand. We are a 100% Mexican company and we are always committed to constant innovation. Our extensive network of agencies throughout Mexico provides you with professional service, with trained and dedicated service agents.
        </p>
        <div className={styles.contentWrapper}>
          <img id="image" src={imgAbout} alt="DINAMO" className={styles.aboutUsImage} />
          <div id="right-content" className={styles.rightContent}>
            <h3>WITH DINAMO YOU GET:</h3>
            <ul>
              <li><span>Warranty:</span> peace of mind with our warranty coverage</li>
              <li><span>Financing:</span> flexible financing options</li>
              <li><span>Services:</span> professional and dedicated services</li>
              <li><span>Quality products:</span> high-quality and reliable products</li>
              <li><span>Reliable performance:</span> consistent and dependable performance</li>
              <li><span>Versatile models for every need:</span> versatile models to meet every requirement</li>
              <li><span>Accessories and spare parts:</span> comprehensive range of accessories and spare parts</li>
            </ul>
          </div>
        </div>

        <div id="first-card" className={`${styles.card} ${styles.firstCard}`} style={{ marginBottom: "60px" }}>
          <h3>MISSION</h3>
          <p>"As an innovative Mexican company, we are committed to our customers, offering affordable Motorcycles with guaranteed support. Our focus is on providing exceptional value and outstanding service, ensuring that every customer receives the best experience. With our dedication to excellence and continuous innovation, we strive to exceed expectations and set new industry standards."</p>
        </div>

        <div id="second-card" className={`${styles.card} ${styles.secondCard}`} style={{ marginLeft: "auto", marginBottom: "60px" }}>
          <h3>VISION</h3>
          <p>"Our goal is to develop the largest, most profitable, and efficient distribution and service network of Mexican brand motorcycles in Latin America. We aim to establish a strong presence throughout the region, providing comprehensive coverage to meet the needs of our customers. Through strategic partnerships and careful expansion, we ensure that our products are accessible. Additionally, we strive to be both profitable and efficient in all areas, optimizing processes and maximizing economic results. With strategically located distribution centers and a skilled team, we deliver an exceptional experience to our customers. Our aim is to lead the Latin American market with the best distribution and service network for Mexican brand motorcycles."</p>
        </div>

        <div id="third-card" className={`${styles.card} ${styles.thirdCard}`} style={{ marginBottom: "60px" }}>
          <h3>VALUES</h3>
          <ul className={styles.values}>
            <li>Our people: <span>Our team consists of highly trained and dedicated professionals, ready to provide you with excellent service and guidance.</span></li>
            <li>Product: <span>Our products include a wide range of quality motorcycles, from sporty models to adventure bikes, designed to give you the best riding experience.</span></li>
            <li>Innovation: <span>Innovation is a fundamental part of our brand. We strive to stay at the forefront of technology and offer innovative features in our motorcycles, so you can enjoy an exciting and safe ride.</span></li>
            <li>Profitability: <span>Profitability is a focus for us, both for our customers and ourselves. We provide flexible and competitive financing options, so you can get the bike of your dreams without compromising your finances.</span></li>
            <li>Solidity: <span>Solidity is an important value for us. We work with reputable and reliable brands, offering high-quality and durable motorcycles, so you can enjoy your bike for many years to come.</span></li>
          </ul>
        </div>

        <div className={styles.findUs}>
          <h3>FIND US!</h3>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.394371349395!2d-97.46122199999999!3d20.5310389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85da6be6847d09e3%3A0x7935b743b7dc8d37!2sDINAMO%20MOTOCICLETAS!5e0!3m2!1ses-419!2sar!4v1686630106124!5m2!1ses-419!2sar"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
