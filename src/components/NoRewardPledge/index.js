import styles from "./NoRewardPledge.module.scss";
import { motion } from "framer-motion";

export const NoRewardPledge = ({ pledgeId, onPledgeSelect }) => {
  const noRewardPledgeCardSelected = pledgeId === "noReward";

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div
      className={
        noRewardPledgeCardSelected
          ? styles.pledgeCardSelected
          : styles.pledgeCard
      }
    >
      <div className={styles.inputAndLabel}>
        <input
          type="radio"
          id="noReward"
          name="pledgeId"
          value="noReward"
          defaultChecked={pledgeId === "noReward"}
          onChange={onPledgeSelect}
        />
        <label htmlFor="noReward" className={styles.noProduct}>
          Pledge with no reward
        </label>
      </div>
      <p className={styles.description}>
        Choose to support us without a reward if you simply believe in our
        project. As a backer, you will be signed up to receive product updates
        via email.
      </p>
      {noRewardPledgeCardSelected && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 1 }}
          className={styles.noRewardPledgeCard}
        >
          <button className={styles.noRewardPledgeButton}>Continue</button>
        </motion.div>
      )}
    </div>
  );
};
