import { MobileMenu } from "../MobileMenu";
import styles from "./Navbar.module.scss";
import { ReactComponent as MenuIcon } from "../../icons/icon-hamburger.svg";
import { ReactComponent as CloseMenuIcon } from "../../icons/icon-close-menu.svg";
import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [navbarBackgroundChange, setNavbarBackgroundChange] = useState(false);

  const handleShowMenu = () => setShowMenu(true);

  const handleCloseMenu = () => setShowMenu(false);

  const changeNavbarBackground = () => {
    window.scrollY >= 305
      ? setNavbarBackgroundChange(true)
      : setNavbarBackgroundChange(false);
  };

  window.addEventListener("scroll", changeNavbarBackground);

  const iconColorClassName = navbarBackgroundChange
    ? `${styles.menuIcon} ${styles.menuIconActive}`
    : styles.menuIcon;

  return (
    <nav
      className={
        navbarBackgroundChange
          ? `${styles.navbar} ${styles.active}`
          : styles.navbar
      }
    >
      <Link to="#top" style={{ textDecoration: "none" }}>
        <h3
          className={
            navbarBackgroundChange
              ? `${styles.logo} ${styles.logoActive}`
              : styles.logo
          }
        >
          crowdfund
        </h3>
      </Link>
      {showMenu ? (
        <CloseMenuIcon className={iconColorClassName} />
      ) : (
        <MenuIcon className={iconColorClassName} onClick={handleShowMenu} />
      )}
      <MobileMenu showMenu={showMenu} handleClose={handleCloseMenu} />
      <ul
        className={
          navbarBackgroundChange
            ? `${styles.links} ${styles.linksActive}`
            : styles.links
        }
      >
        <li>About</li>
        <li>Discover</li>
        <li>Get Started</li>
      </ul>
    </nav>
  );
};
