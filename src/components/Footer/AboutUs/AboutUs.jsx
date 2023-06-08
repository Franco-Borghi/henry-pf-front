import React from "react";
import styles from "./AboutUs.module.css";
import imgAbout from "../img-about.jpg";


const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <h2>MUEVETE EN MOTO, MUEVETE EN DINAMO</h2>
      
      <p>
        Nuestra experiencia, productos y servicios, la calidad que ofrecemos,
        nuestra planta ensambladora, así como el reconocimiento y respeto que se
        ha ganado la marca DINAMO a través de los años, nos respaldan y
        fortalecen.
      </p>
      <p>
        Deseamos que tu experiencia en DINAMO sea altamente satisfactoria y que
        te sientas orgulloso de formar parte de esta gran marca. Somos una
        empresa 100% mexicana y estamos comprometidos contigo siempre
        innovando permanentemente. Nuestra gran Red de agencias en todo México
        te brinda un servicio profesional, con agentes de servicio capacitados
        y comprometidos.
      </p>
      <img
        src={imgAbout}
        alt="DINAMO"
        className={styles.aboutUsImage}
      />
      <h4>CON DINAMO OBTIENES:</h4>
      <ul>
        <li>RECOMENDACIONES</li>
        <li>GARANTÍA</li>
        <li>FINANCIAMIENTO</li>
        <li>SERVICIOS</li>
      </ul>
      <h4>MISIÓN</h4>
      <p>
        "SER UNA EMPRESA MEXICANA INNOVADORA, COMPROMETIDA CON SUS CLIENTES,
        OFRECIENDO MOTOCICLETAS ACCESIBLES CON SOPORTE GARANTIZADO".
      </p>
      <h4>VISIÓN</h4>
      <p>
        "TENER LA RED DE DISTRIBUCIÓN Y SERVICIO DE MOTOCICLETAS DE MARCA MEXICANA
        MÁS GRANDE, RENTABLE Y EFICIENTE DE LATINOAMÉRICA."
      </p>
      <h4>VALORES</h4>
      <ul>
        <li>NUESTRA GENTE</li>
        <li>PRODUCTO</li>
        <li>INNOVACIÓN</li>
        <li>RENTABILIDAD</li>
        <li>SOLIDEZ</li>
      </ul>
    </div>
  );
};

export default AboutUs;