import styles from "./Navbar.module.scss";
import menuIcon from "../../icons/icon-hamburger.svg";
import { useState } from "react";

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h3 className={styles.logo}>crowdfund</h3>
      {/* Mobile */}
      <img
        className={styles.burgerMenu}
        src={menuIcon}
        alt="menu-icon"
        height="15px"
      />
      {/* Desktop */}
      <ul className={styles.links}>
        <li>About</li>
        <li>Discover</li>
        <li>Get Started</li>
      </ul>
    </div>
  );
};
