import styles from "./Pledge.module.scss";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import useDebouncedCallback from "../../hooks/useDebounceCallback";

export const Pledge = ({ minimumAmount, id, onContinueButtonClick }) => {
  const [lowValueErrorMessage, setLowValueErrorMessage] = useState("");
  const [enterPledgeErrorMessage, setEnterPledgeErrorMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const amountInputRef = useRef();

  // input form validations
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

  // usedebounce hook
  const debouncedValidatePledgeAmount = useDebouncedCallback(() => {
    validatePledgeAmount();
  }, 500);

  const handleChange = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");

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
            id="$"
            data-testid="input-value"
          />
          <label htmlFor="$" className={styles.placeholder}>
            $
          </label>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
              className={`${styles.pledgeButton} ${
                buttonDisabled && styles.buttonDisabled
              }`}
              onClick={() =>
                onContinueButtonClick(id, amountInputRef.current.value)
              }
              disabled={buttonDisabled}
            >
              Continue
            </button>
          </div>
        </div>
      </motion.div>
      {lowValueErrorMessage && minimumAmount !== "" ? (
        <p data-testid="low-value-error" className={styles.errorMessage}>
          {lowValueErrorMessage}
        </p>
      ) : null}
      {enterPledgeErrorMessage && !minimumAmount ? (
        <p className={styles.errorMessage}>{enterPledgeErrorMessage}</p>
      ) : null}
    </div>
  );
};
