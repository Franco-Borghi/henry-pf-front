import React from "react";
import styles from "./OurTeam.module.scss";
import imgAbout from "../img-about.jpg";
import { animateChildElements, animateElements } from "../../../utils";


const OurTeam = () => {

  const teamMembers = [
    {
      name: "Jose Antonio Flores",
      position: "Full Stack Developer",
      education: "Benemerita Universidad Autonoma of Puebla, graduate of Henry",
      previousEmployment: "Commercial executive at Citibanamex",
      image: "https://ca.slack-edge.com/TPRS7H4PN-U03HZEVB12R-29f3aebacb75-512",
      linkedin: 'https://www.linkedin.com/in/antonio-flores-desarrollador/'
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
      name: "Lucas Schneebeli",
      position: "Full Stack Developer",
      education: "Sophmore at Florida International Univeristy - Business Analytics, Henry Academy",
      previousEmployment: "",
      image: 'https://media.licdn.com/dms/image/D4E03AQGIco5ycGf4kQ/profile-displayphoto-shrink_200_200/0/1686872918530?e=1692230400&v=beta&t=13CLKtJD-9nGg3OU-b6Lg_-6dhwehMcssZgDVXjB6Tc',
      linkedin: 'https://www.linkedin.com/in/lucas-schneebeli-593733253/'
    },
    {
      name: "Ivan Nicolas Daicich",
      position: "Full Stack Developer - ",
      education: "Universidad del Salvador - Computer Engineer, Henry Academy",
      previousEmployment: "",
      image: 'https://media.licdn.com/dms/image/D4D03AQF8Nv8083lsaA/profile-displayphoto-shrink_800_800/0/1686872681129?e=1692230400&v=beta&t=n6fWXRdXm1TP2iw_YLq5efh1vXK9BPzWCeYwcvFRPb8',
      linkedin: 'https://www.linkedin.com/in/ivan-daicich-166479215/'
    },
    {
      name: "Franco Triadani",
      position: "Full Stack Developer - ",
      education: "UE Siglo 21 - Cordoba, Argentina, Analista de Mercado, Henry Academy",
      previousEmployment: "",
      image: 'https://ca.slack-edge.com/TPRS7H4PN-U037RDSS4NQ-4787d9808eb7-512',
      linkedin: 'https://www.linkedin.com/in/francotriadani/'

    },
    {
      name: "Ramiro Roballos",
      position: "Full Stack Developer",
      education: "Universidad del Salvador, Kellogg, Henry Academy",
      previousEmployment: "Associate Partner at McKinsey & Company",
      image: "https://media.licdn.com/dms/image/D4E03AQGIsoTzTg-P5w/profile-displayphoto-shrink_400_400/0/1664922341051?e=1692230400&v=beta&t=m9EKkZLYrSprA1TVkskrovvnEH7LyzhLCLHQlgOFmWI",
      linkedin: 'https://www.linkedin.com/in/ramiro-roballos-0ba01450/'
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
                <p className={styles.memberEducation}>University: {member.education}</p>
                {member.previousEmployment ? <p className={styles.memberEmployment}>Relevant trajectory: {member.previousEmployment}</p>: null  }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
