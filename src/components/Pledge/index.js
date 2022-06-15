import styles from "./Pledge.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import useDebouncedCallback from "../../hooks/useDebounceCallback";

export const Pledge = ({
  pledgeAmountInput,
  pledgeAmountfromPledge,
  onPledgeTypeChange,
  name,
  onContinueButtonClick,
}) => {
  const [lowValueErrorMessage, setLowValueErrorMessage] = useState("");
  const [enterPledgeErrorMessage, setEnterPledgeErrorMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // input form validations
  const validatePledgeAmount = () => {
    console.log({ pledgeAmountInput });
    if (pledgeAmountInput < pledgeAmountfromPledge) {
      // show error message if the amount inserted by the user is lower than the required
      setLowValueErrorMessage(
        `Value must be greater than or equal to $${pledgeAmountfromPledge}`
      );
      // disable button if amount inserted by the user is less than the required
      setButtonDisabled(true);
    } else {
      setLowValueErrorMessage(null);
      setButtonDisabled(false);
    }
  };

  // usedebounce hook
  const debouncedValidatePledgeAmount = useDebouncedCallback(() => {
    validatePledgeAmount();
  }, 500);

  const handleChange = (e) => {
    if (onPledgeTypeChange) {
      onPledgeTypeChange(e);
    }
    debouncedValidatePledgeAmount();
  };

  // display error message when use hovers the button without inserting the pledge
  const handleMouseEnter = () => {
    if (buttonDisabled) {
      setEnterPledgeErrorMessage("Please enter your pledge");
    }
  };
  const handleMouseLeave = () => {
    setEnterPledgeErrorMessage("");
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
    <div className={styles.pledgeCardAndErrorMessage}>
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
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
              className={`${styles.pledgeButton} ${
                buttonDisabled && styles.buttonDisabled
              }`}
              onClick={onContinueButtonClick}
              disabled={buttonDisabled}
            >
              Continue
            </button>
          </div>
        </div>
      </motion.div>
      {lowValueErrorMessage && pledgeAmountInput !== "" ? (
        <p className={styles.errorMessage}>{lowValueErrorMessage}</p>
      ) : null}
      {enterPledgeErrorMessage && !pledgeAmountInput ? (
        <p className={styles.errorMessage}>{enterPledgeErrorMessage}</p>
      ) : null}
    </div>
  );
};
