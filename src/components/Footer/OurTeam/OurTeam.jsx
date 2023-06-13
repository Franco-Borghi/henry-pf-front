import React from "react";
import styles from "./OurTeam.module.scss";
import imgAbout from "../img-about.jpg";
import tony from "../tony.jpg";
import { animateChildElements, animateElements } from "../../../utils";


const OurTeam = () => {

  const teamMembers = [
    {
      name: "Jose Antonio Flores",
      position: "Full Stack Developer - Sales Manager",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      previousEmployment: "Commercial executive at Citibanamex",
      image: tony,
      linkedin: ''
    },
    {
      // LISTO //
      name: "Franco Julián Borghi",
      position: "Full Stack Developer",
      education: "National Technological University of Argentina (UTN), Platzi, Henry Academy",
      previousEmployment: "Front End developer - Wordpress implementer",
      image: 'https://ca.slack-edge.com/T01BVQ28CA0-U03A13YRRMH-980a9c0dbd7b-512',
      linkedin: 'https://www.linkedin.com/in/franco-j-borghi/'
    },
    {
      name: "Compa",
      position: "Full Stack Developer - ",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      previousEmployment: "Commercial executive at Citibanamex",
      image: imgAbout,
      linkedin: ''
    },
    {
      name: "Compa",
      position: "Full Stack Developer - ",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      previousEmployment: "Commercial executive at Citibanamex",
      image: imgAbout,
      linkedin: ''
    },
    {
      name: "Compa",
      position: "Full Stack Developer - ",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      previousEmployment: "Commercial executive at Citibanamex",
      image: imgAbout,
      linkedin: ''
    },
    {
      name: "Compa",
      position: "Full Stack Developer - ",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      previousEmployment: "Commercial executive at Citibanamex",
      image: imgAbout,
      linkedin: ''
    },
  ];

  function sortTeamMembersByName(teamMembers) {
    const sortedArray = [...teamMembers];
    sortedArray.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedArray;
  }

  React.useEffect(() => {
    window.innerWidth > 1023 && animateChildElements(['parent'], 'left', 700, true);
    window.innerWidth <= 1023 && animateElements(['child-0', 'child-1', 'child-2', 'child-3', 'child-4', 'child-5'], 'left', true)
    
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.ourTeamSection}>
        <h1 className={styles.ourTeamTitle}>OUR TEAM</h1>
        <div id="parent" className={styles.teamMembersContainer}>
          {sortTeamMembersByName(teamMembers).map((member, index) => (
            <div id={`child-${index}`} onClick={() => member.linkedin && window.open(member.linkedin, '_blank')} key={index} className={styles.teamMember}>
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
    </div>
  );
};

export default OurTeam;
