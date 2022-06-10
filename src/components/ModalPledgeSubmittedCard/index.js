import { HashLink as Link } from "react-router-hash-link";
import { Modal } from "react-bootstrap";
import styles from "./ModalPledgeSubmittedCard.module.scss";
import iconCheck from "../../icons/icon-check.svg";

export const ModalPledgeSubmittedCard = ({
  formSubmitted,
  handleClose,
  confirmationPledgeText,
}) => {
  return (
    <Modal
      show={formSubmitted}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName={styles.campaignsModal}
    >
      <div className={styles.modalContainer}>
        <img
          className={styles.iconCheck}
          src={iconCheck}
          alt="completed action icon"
        />
        <h5 className={styles.sayThanks}>Thanks for your support!</h5>
        <p className={styles.confirmationText}>{confirmationPledgeText}</p>
        <Link to="#top">
          <button onClick={handleClose} className={styles.confirmationBtn}>
            Got it
          </button>
        </Link>
      </div>
    </Modal>
  );
};
