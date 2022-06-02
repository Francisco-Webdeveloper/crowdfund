import styles from "./CampaignCard.module.scss";

export const CampaignCard = ({ product, description, pledgeAmount, stock }) => {
  const campaignCardClassName =
    stock > 0 ? styles.campaignCard : styles.campaignCardDisabled;
  const selectRewardClassName =
    stock > 0 ? styles.selectReward : styles.selectRewardDisabled;
  return (
    <div className={campaignCardClassName}>
      <div className={styles.productAndPledge}>
        <p className={styles.product}>{product}</p>
        <p className={styles.pledgeAmount}>Pledge ${pledgeAmount} or more</p>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.stockAndSelect}>
        <div className={styles.stockLeft}>
          <h1 className={styles.stock}>{stock}</h1>
          <span className={styles.left}>left</span>
        </div>
        <button className={selectRewardClassName} disabled={true}>
          {stock > 0 ? "Select Reward" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};
