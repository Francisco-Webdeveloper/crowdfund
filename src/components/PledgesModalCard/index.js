import { Modal } from "react-bootstrap";
import { ModalPledgeSubmittedCard } from "../ModalPledgeSubmittedCard";
import styles from "./PledgesModalCard.module.scss";
import closeModalIcon from "../../icons/icon-close-modal.svg";

export const PledgesModalCard = ({
  showModal,
  onHide,
  modalIntroduction,
  pledgeSubmitted,
  confirmationPledgeText,
  children,
}) => {
  return pledgeSubmitted ? (
    // show the modal that confirms the form submission
    <ModalPledgeSubmittedCard
      handleClose={onHide}
      confirmationPledgeText={confirmationPledgeText}
    />
  ) : (
    // show the modal that shows the pledges and inputs
    <Modal
      show={showModal}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName={styles.pledgesModal}
      data-testid="pledges-modal"
    >
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Back this project</h2>
          <img
            data-testid="close-modal"
            className={styles.modalClose}
            src={closeModalIcon}
            alt="close-modal"
            onClick={onHide}
          />
        </div>
        <p className={styles.introduction}>{modalIntroduction}</p>
        {children}
      </div>
    </Modal>
  );
};
