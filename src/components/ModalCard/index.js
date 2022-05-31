import { Modal } from "react-bootstrap";
import { RadioButtons } from "../RadioButtons";
import styles from "./ModalCard.module.scss";
import closeModalIcon from "../../icons/icon-close-modal.svg";

export const ModalCard = ({
  showModal,
  handleClose,
  campaigns,
  modalIntroduction,
  ...rest
}) => {
  const campaignsList = campaigns.map(
    ({ product, pledgeAmount, description, stock }) => {
      const campaignCardClassName =
        stock > 0 ? styles.campaignCard : styles.campaignCardDisabled;
      const disabled = stock > 0 ? false : true;
      return (
        <div className={campaignCardClassName}>
          <div className={styles.inputLabelAndPledgeAmount}>
            <input type="radio" id={product} disabled={disabled} />
            <div className={styles.labelAndPledgeAmount}>
              <label htmlFor={product} className={styles.product}>
                {product}
              </label>
              <p className={styles.pledgeAmount}>
                Pledge ${pledgeAmount} or more
              </p>
            </div>
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.stockLeft}>
            <h3 className={styles.stock}>{stock} </h3>
            <p className={styles.left}>left</p>
          </div>
        </div>
      );
    }
  );
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
        <RadioButtons campaignsList={campaignsList} {...rest} />
      </div>
    </Modal>
  );
};
