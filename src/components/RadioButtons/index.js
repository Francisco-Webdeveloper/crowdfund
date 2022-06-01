import styles from "./RadioButtons.module.scss";

export const RadioButtons = ({
  campaigns,
  noRewardPledge,
  noRewardPledgeDescription,
}) => {
  const campaignsList = campaigns.map(
    ({ product, pledgeAmount, description, stock }) => {
      const campaignCardClassName =
        stock > 0 ? styles.campaignCard : styles.campaignCardDisabled;
      const disabled = stock > 0 ? false : true;
      return (
        <div className={campaignCardClassName}>
          <div className={styles.inputLabelAndPledgeAmount}>
            <input type="radio" id={product} disabled={disabled} />
            <div className={styles.labelAndPledgeAmount}>
              <label htmlFor={product} className={styles.product}>
                {product}
              </label>
              <p className={styles.pledgeAmount}>
                Pledge ${pledgeAmount} or more
              </p>
            </div>
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.stockLeft}>
            <h3 className={styles.stock}>{stock} </h3>
            <p className={styles.left}>left</p>
          </div>
        </div>
      );
    }
  );

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
