import { MobileMenu } from "../MobileMenu";
import styles from "./Navbar.module.scss";
import menuIcon from "../../icons/icon-hamburger.svg";
import closeMenuIcon from "../../icons/icon-close-menu.svg";
import { useState } from "react";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => setShowMenu(true);

  const handleCloseMenu = () => setShowMenu(false);

  const icon = showMenu ? closeMenuIcon : menuIcon;
  return (
    <div className={styles.navbar}>
      <h3 className={styles.logo}>crowdfund</h3>
      {/* Mobile */}
      <img
        className={styles.menuIcon}
        src={icon}
        alt="menu-icon"
        onClick={handleShowMenu}
        height="15px"
      />
      <MobileMenu showMenu={showMenu} handleClose={handleCloseMenu} />
      {/* Desktop */}
      <ul className={styles.links}>
        <li>About</li>
        <li>Discover</li>
        <li>Get Started</li>
      </ul>
    </div>
  );
};
