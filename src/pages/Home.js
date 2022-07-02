import styles from "./Home.module.scss";
import { Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <nav className={styles.navbar}>
        <h3 className={styles.logo}>punchstarter</h3>
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
          Bring a creative project<br></br> to life.
        </h3>
        <p className={styles.onCrowdfund}>ON CROWDFUND:</p>
        <Row
          xs={1}
          md={3}
          className={styles.ProjectsStatus}

          //   class="row row-cols-1 row-cols-md-3"
        >
          <Col className={styles.projectsFunded}>
            <h2 className={styles.metric}>222,679</h2>
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
      </div>
    </div>
  );
};
export default Home;
