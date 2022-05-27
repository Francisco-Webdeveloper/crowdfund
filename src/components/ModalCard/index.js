import { Modal, Button } from "react-bootstrap";
import styles from "./ModalCard.module.scss";

export const ModalCard = ({ showModal, handleClose }) => {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName={styles.modalWidth}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.text}>
        Woohoo, you're reading this text in a modal!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
