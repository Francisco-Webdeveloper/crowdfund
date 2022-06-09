import styles from "./Pledge.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import useDebouncedCallback from "../../hooks/useDebounceCallback";

export const Pledge = ({
  pledgeAmountInput,
  pledgeAmountCampaign,
  onChange,
  name,
}) => {
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // input form validations
  const validatePledgeAmount = () => {
    console.log({ pledgeAmountInput });
    if (pledgeAmountInput < pledgeAmountCampaign) {
      // show error message if the amount inserted by the user is lower than the required
      setValidationErrorMessage(
        `Value must be greater than or equal to $${pledgeAmountCampaign}`
      );
      // disable button if amount inserted by the user is less than the required
      setButtonDisabled(true);
    } else {
      setValidationErrorMessage(null);
      setButtonDisabled(false);
    }
  };

  // usedebounce hook
  const debouncedValidatePledgeAmount = useDebouncedCallback(() => {
    validatePledgeAmount();
  }, 500);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    debouncedValidatePledgeAmount();
  };

  const inputValidationClassName =
    buttonDisabled && pledgeAmountInput !== ""
      ? styles.invalidInput
      : styles.validInput;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 1 }}
      className={styles.pledgeCard}
    >
      <p className={styles.pledgeTitle}>Enter your pledge</p>
      <div className={styles.pledgeAndSubmit}>
        <input
          type="text"
          value={pledgeAmountInput}
          className={`${styles.pledgeInput} ${inputValidationClassName}`}
          name={name}
          required
          onChange={handleChange}
        />
        <span className={styles.placeholder}>$</span>
        <button
          className={`${styles.pledgeButton} ${
            buttonDisabled && styles.buttonDisabled
          }`}
          disabled={buttonDisabled}
        >
          Continue
        </button>
      </div>
      {validationErrorMessage && pledgeAmountInput !== "" && (
        <p className={styles.validationErrorMessage}>
          {validationErrorMessage}
        </p>
      )}
    </motion.div>
  );
};
