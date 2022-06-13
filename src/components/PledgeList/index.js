import styles from "./PledgeList.module.scss";
import { ProductPledgeList } from "../ProductPledgeList";

export const PledgeList = ({
  pledges,
  selectedPledge,
  onPledgeTypeChange,
  onSubmit,
  onPledgeConfirmClick,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div
          className={
            selectedPledge.pledgeId === "noReward"
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
        </div>
        <ProductPledgeList
          pledges={pledges}
          selectedPledge={selectedPledge}
          onChange={onPledgeTypeChange}
          onPledgeConfirmClick={onPledgeConfirmClick}
        />
      </form>
    </>
  );
};
