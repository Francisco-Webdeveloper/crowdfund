import styles from "./Pledge.module.scss";
import { motion } from "framer-motion";

export const Pledge = ({ pledgeAmount, onChange, name }) => {
  return (
    <div className={styles.pledgeCard}>
      <p className={styles.pledgeTitle}>Enter your pledge</p>
      <div className={styles.pledgeAndSubmit}>
        <input
          type="text"
          pattern="[0-9]*"
          value={pledgeAmount}
          placeholder="$"
          onChange={onChange}
          className={styles.pledgeInput}
          name={name}
        />
        <button className={styles.pledgeButton}>Continue</button>
      </div>
    </div>
  );
};
