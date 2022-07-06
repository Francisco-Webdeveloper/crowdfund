import { HashLink as Link } from "react-router-hash-link";
import { Modal } from "react-bootstrap";
import styles from "./PledgeSubmittedModalCard.module.scss";
import iconCheck from "../../icons/icon-check.svg";

export const PledgeSubmittedModalCard = ({
  onCloseClick,
  confirmationPledgeText,
  showModal,
}) => {
  return (
    <Modal
      show={showModal}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName={styles.pledgesModal}
      onHide={onCloseClick}
    >
      <div
        className={styles.modalContainer}
        data-testid="pledge-submitted-modal"
      >
        <img
          className={styles.iconCheck}
          src={iconCheck}
          alt="completed action icon"
        />
        <h5 className={styles.sayThanks}>Thanks for your support!</h5>
        <p role="paragraph" className={styles.confirmationText}>
          {confirmationPledgeText}
        </p>
        <Link to="#top">
          <button onClick={onCloseClick} className={styles.confirmationBtn}>
            Got it
          </button>
        </Link>
      </div>
    </Modal>
  );
};
