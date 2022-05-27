import styles from "./Campaigns.module.scss";

export const Campaigns = ({ product, description, pledgeAmount, stock }) => {
  return (
    <div className={styles.campaignCard}>
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
        <button className={styles.selectReward}>Select Reward</button>
      </div>
    </div>
  );
};
