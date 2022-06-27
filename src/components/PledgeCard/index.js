import styles from "./PledgeCard.module.scss";
import { HashLink as Link } from "react-router-hash-link";

export const PledgeCard = ({
  product,
  description,
  pledgeAmount,
  stock,
  onClick,
  selectedPledge,
}) => {
  // opens the pledge list modal with the pledge selected from the project page
  const handleSelectedCardClicked = () => {
    onClick(); // show modal
    selectedPledge.pledgeId = product;
  };

  const pledgeCardClassName =
    stock > 0 ? styles.pledgeCard : styles.pledgeCardDisabled;
  const selectRewardClassName =
    stock > 0 ? styles.selectReward : styles.selectRewardDisabled;

  return (
    <div className={pledgeCardClassName}>
      <div className={styles.productAndPledge}>
        <p className={styles.product}>{product}</p>
        <p className={styles.pledgeAmount}>Pledge ${pledgeAmount} or more</p>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.stockAndSelect}>
        <div className={styles.stockLeft}>
          <h1 className={styles.stock} data-testid="stock-left">
            {stock}
          </h1>
          <span className={styles.left}>left</span>
        </div>
        <Link to="#reward">
          <button
            className={selectRewardClassName}
            disabled={stock > 0 ? false : true}
            onClick={handleSelectedCardClicked}
          >
            {stock > 0 ? "Select Reward" : "Out of Stock"}
          </button>
        </Link>
      </div>
    </div>
  );
};
