import styles from "./RadioButtons.module.scss";

export const RadioButtons = ({
  campaignsList,
  noRewardPledge,
  noRewardPledgeDescription,
}) => {
  return (
    <form type="radio">
      <div className={styles.campaignCard}>
        <div className={styles.inputAndLabel}>
          <input type="radio" id="noReward" />
          <label htmlFor="noReward" className={styles.noProduct}>
            {noRewardPledge}
          </label>
        </div>
        <p className={styles.description}>{noRewardPledgeDescription}</p>
      </div>
      {campaignsList}
    </form>
  );
};
