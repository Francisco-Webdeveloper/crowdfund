import styles from "./Pledge.module.scss";
import { motion } from "framer-motion";

export const Pledge = ({ pledgeAmount, onChange, name }) => {
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
          value={pledgeAmount}
          onChange={onChange}
          className={styles.pledgeInput}
          name={name}
        />
        <span className={styles.placeholder}>$</span>
        <button className={styles.pledgeButton}>Continue</button>
      </div>
    </motion.div>
  );
};
