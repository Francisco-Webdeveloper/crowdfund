import { Modal } from "react-bootstrap";
import styles from "./PledgesModalCard.module.scss";
import closeModalIcon from "../../icons/icon-close-modal.svg";

export const PledgesModalCard = ({
  showModal,
  handleClose,
  modalIntroduction,
  children,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName={styles.campaignsModal}
      className={styles.modalContent}
    >
      <div className={styles.modalContainer}>
        <div>
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
        </div>
        {children}
      </div>
    </Modal>
  );
};
