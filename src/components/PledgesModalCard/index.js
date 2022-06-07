import { Modal } from "react-bootstrap";
import { ModalPledgeSubmittedCard } from "../ModalPledgeSubmittedCard";
import styles from "./PledgesModalCard.module.scss";
import closeModalIcon from "../../icons/icon-close-modal.svg";

export const PledgesModalCard = ({
  showModal,
  handleClose,
  modalIntroduction,
  formData,
  confirmationPledgeText,
  children,
}) => {
  return formData.formSubmitted ? (
    // show the modal that confirms the form submission
    <ModalPledgeSubmittedCard
      formSubmitted={formData.formSubmitted}
      handleClose={handleClose}
      confirmationPledgeText={confirmationPledgeText}
    />
  ) : (
    // show the modal that shows the campaigns and inputs
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName={styles.campaignsModal}
    >
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Back this project</h2>
          <img
            className={styles.modalClose}
            src={closeModalIcon}
            alt="close-modal"
            onClick={handleClose}
          />
        </div>
        <p className={styles.introduction}>{modalIntroduction}</p>
        {children}
      </div>
    </Modal>
  );
};
