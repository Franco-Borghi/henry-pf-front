import React from "react";
import styles from "./OurTeam.module.css";
import imgAbout from "../img-about.jpg";
import tony from "../tony.jpg";


const OurTeam = () => {
  const teamMembers = [
    {
      name: "Jose Antonio Flores",
      position: "Full Stack Developer - Sales Manager",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      
      previousEmployment: "Commercial executive at Citibanamex",
      image: tony,
    },
    {
      name: "Compa",
      position: "Full Stack Developer - ",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      
      previousEmployment: "Commercial executive at Citibanamex",
      image: imgAbout,
    },
    {
      name: "Compa",
      position: "Full Stack Developer - ",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      
      previousEmployment: "Commercial executive at Citibanamex",
      image: imgAbout,
    },
    {
      name: "Compa",
      position: "Full Stack Developer - ",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      
      previousEmployment: "Commercial executive at Citibanamex",
      image: imgAbout,
    },
    {
      name: "Compa",
      position: "Full Stack Developer - ",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      
      previousEmployment: "Commercial executive at Citibanamex",
      image: imgAbout,
    },
    
  ];

  return (
    <div className={styles.ourTeamSection}>
      <h3 className={styles.ourTeamTitle}>Our Team Perfect</h3>
      <div className={styles.teamMembersContainer}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamMember}>
            <img className={styles.memberImage} src={member.image} alt={member.name} />
            <div className={styles.memberDetails}>
              <h4 className={styles.memberName}>{member.name}</h4>
              <p className={styles.memberPosition}>{member.position}</p>
              <p className={styles.memberEducation}>Scholarship: {member.education}</p>
              <p className={styles.memberEmployment}>Relevant trajectory: {member.previousEmployment}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
