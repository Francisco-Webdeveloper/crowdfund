import styles from "./Home.module.scss";
import projectsData from "../projectsData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { database } from "../firebaseConfig";
import {
  collection,
  getDocs,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";

const Home = () => {
  const [allProjects, setAllProjects] = useState(null);

  const { projects } = projectsData.data;

  // Firebase - collection ref
  const colRef = collection(database, "projects");

  // Firebase - real time collection data
  const collectProjectsDataFromFirebase = () => {
    onSnapshot(colRef, (snapshot) => {
      const projects = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setAllProjects(projects);
    });
  };

  useEffect(() => {
    collectProjectsDataFromFirebase();
  }, []);

  console.log(allProjects);

  //   const projects = setTimeout(
  //     () =>
  //       allProjects.map(({ identifier, title, description, coverImage }) => {
  //         return (
  //           <Link
  //             to={`/project/${identifier}`}
  //             className={styles.project}
  //             key={title}
  //           >
  //             <img
  //               src={process.env.PUBLIC_URL + `/images/${coverImage}`}
  //               alt="project-cover-img"
  //               className={styles.projectCoverImg}
  //             />
  //             <div className={styles.nameAndDescription}>
  //               <h5 className={styles.name}>{title}</h5>
  //               <p className={styles.description}>{description}</p>
  //             </div>
  //           </Link>
  //         );
  //       }),
  //     1000
  //   );

  return (
    <div className={styles.homeContainer}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>crowdfund</h1>
        <ul className={styles.links}>
          <li>Arts</li>
          <li>Comic & Illustration</li>
          <li>Design & Tech</li>
          <li>Film</li>
          <li>Food & Craft</li>
          <li>Games</li>
          <li>Music</li>
          <li>Publishing</li>
        </ul>
      </nav>
      <div className={styles.content}>
        <h3 className={styles.title}>
          Bring a creative project<br className={styles.slogan}></br> to life.
        </h3>
        <p className={styles.onCrowdfund}>ON CROWDFUND:</p>
        <Row xs={1} md={3} className={styles.ProjectsStatus}>
          <Col className={styles.projectsFunded}>
            <h2 className={styles.metric}>{projects.length}</h2>
            <p className={styles.metricDescription}>projects funded</p>
          </Col>
          <Col className={styles.totalMoneyBacked}>
            <h2 className={styles.metric}>$6,121,591,854</h2>
            <p className={styles.metricDescription}>towards creative work</p>
          </Col>
          <Col className={styles.totalPledges}>
            <h2 className={styles.metric}>68,417,086</h2>
            <p className={styles.metricDescription}>pledges</p>
          </Col>
        </Row>
        <p className={styles.featuredProjects}>FEATURED PROJECTS</p>
        <Row xs={2} md={3} className={styles.projects}>
          {projects.map(({ id, title, description, coverImage }) => {
            return (
              <Link
                to={`/project/${id}`}
                className={styles.project}
                key={title}
              >
                <img
                  src={process.env.PUBLIC_URL + `/images/${coverImage}`}
                  alt="project-cover-img"
                  className={styles.projectCoverImg}
                />
                <div className={styles.nameAndDescription}>
                  <h5 className={styles.name}>{title}</h5>
                  <p className={styles.description}>{description}</p>
                </div>
              </Link>
            );
          })}
          {/* {projects} */}
        </Row>
      </div>
    </div>
  );
};
export default Home;
