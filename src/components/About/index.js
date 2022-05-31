import styles from "./About.module.scss";

export const About = ({ about }) => {
  return (
    <div className={styles.about}>
      <h3 className={styles.title}>About this project</h3>
      <p className={styles.description}>{about}</p>
    </div>
  );
};
