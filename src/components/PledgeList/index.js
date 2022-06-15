import styles from "./PledgeList.module.scss";
import { ProductPledgeList } from "../ProductPledgeList";
import { motion } from "framer-motion";

export const PledgeList = ({
  pledges,
  selectedPledge,
  onPledgeTypeChange,
  onSubmit,
  onPledgeConfirmClick,
  onStockUpdate,
}) => {
  const noRewardPledgeCardSelected = selectedPledge.pledgeId === "noReward";
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <>
      <form onSubmit={onSubmit}>
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
              checked={selectedPledge.pledgeId === "noReward"}
              onChange={onPledgeTypeChange}
            />
            <label htmlFor="noReward" className={styles.noProduct}>
              Pledge with no reward
            </label>
          </div>
          <p className={styles.description}>
            Choose to support us without a reward if you simply believe in our
            project. As a backer, you will be signed up to receive product
            updates via email.
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
        <ProductPledgeList
          pledges={pledges}
          selectedPledge={selectedPledge}
          onPledgeTypeChange={onPledgeTypeChange}
          onPledgeConfirmClick={onPledgeConfirmClick}
          onStockUpdate={onStockUpdate}
        />
      </form>
    </>
  );
};
