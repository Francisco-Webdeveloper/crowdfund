import { Modal } from "react-bootstrap";
import styles from "./MobileMenu.module.scss";

export const MobileMenu = ({ showMenu, handleClose }) => {
  return (
    <Modal
      show={showMenu}
      onHide={handleClose}
      dialogClassName={styles.menuModal}
      centered={false}
    >
      <div className={styles.menuContent}>
        <div>About</div>
        <div className={styles.discover}>Discover</div>
        <div>Get Started</div>
      </div>
    </Modal>
  );
};
