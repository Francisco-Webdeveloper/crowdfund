import styles from "./Navbar.module.scss";

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h3 className={styles.logo}>crowdfund</h3>
      <ul className={styles.links}>
        <li>About</li>
        <li>Discover</li>
        <li>Get Started</li>
      </ul>
    </div>
  );
};
