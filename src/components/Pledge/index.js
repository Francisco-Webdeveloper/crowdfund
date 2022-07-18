import styles from "./Pledge.module.scss";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import clsx from "clsx";

export const Pledge = ({ minimumAmount, id }) => {
  const [lowValueErrorMessage, setLowValueErrorMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const amountInputRef = useRef();

  const validatePledgeAmount = () => {
    if (Number(amountInputRef.current.value) < minimumAmount) {
      setLowValueErrorMessage(
        `Value must be greater than or equal to $${minimumAmount}`
      );
      setButtonDisabled(true);
    } else {
      setLowValueErrorMessage(null);
      setButtonDisabled(false);
    }
  };

  const handleChange = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
    validatePledgeAmount();
  };

  const inputValidationClassName =
    buttonDisabled && minimumAmount !== ""
      ? styles.invalidInput
      : styles.validInput;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={styles.pledgeCardAndErrorMessage}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 1 }}
        className={styles.pledgeCard}
        data-testid="pledge-input"
      >
        <p className={styles.pledgeTitle}>Enter your pledge</p>
        <div className={styles.pledgeAndSubmit}>
          <input
            type="text"
            ref={amountInputRef}
            className={`${styles.pledgeInput} ${inputValidationClassName}`}
            name="pledgeAmount"
            required
            onChange={handleChange}
            id={id}
            data-testid="input-value"
          />
          <label htmlFor={id} className={styles.placeholder}>
            $
          </label>
          <button
            className={clsx(
              styles.pledgeButton,
              buttonDisabled && styles.buttonDisabled
            )}
            disabled={buttonDisabled}
          >
            Continue
          </button>
        </div>
      </motion.div>
      {lowValueErrorMessage && minimumAmount !== "" ? (
        <p data-testid="low-value-error" className={styles.errorMessage}>
          {lowValueErrorMessage}
        </p>
      ) : null}
    </div>
  );
};
