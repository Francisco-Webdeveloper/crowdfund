import { Pledge } from "../Pledge";
import styles from "./ProductPledgeList.module.scss";

export const ProductPledgeList = ({
  pledges,
  selectedPledge,
  onChange,
  onPledgeConfirmClick,
  stockUpdate,
}) => {
  return pledges.map(({ id, pledgeAmount, description, stock }) => {
    const disabled = stock > 0 ? false : true;
    const pledgeCardSelected = id === selectedPledge.pledgeId;

    const updateStockAndProjectStatus = () => {
      onPledgeConfirmClick();
      stockUpdate(id, stock);
    };

    let pledgeCardClassName;
    if (stock > 0) {
      if (pledgeCardSelected) {
        pledgeCardClassName = styles.pledgeCardSelected;
      } else {
        pledgeCardClassName = styles.pledgeCard;
      }
    } else {
      pledgeCardClassName = styles.pledgeCardDisabled;
    }

    return (
      <div key={id} className={pledgeCardClassName} id="reward">
        <div className={styles.inputLabelAndPledgeAmount}>
          <input
            type="radio"
            id={id}
            name="pledgeId"
            value={id}
            checked={pledgeCardSelected} // React is in charge of controlling the input rather than the input having its own html state
            onChange={onChange}
            disabled={disabled}
          />
          <div className={styles.labelAndPledgeAmount}>
            <label htmlFor={id} className={styles.product}>
              {id}
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
        {pledgeCardSelected && (
          <Pledge
            pledgeAmountInput={selectedPledge.pledgeAmount}
            pledgeAmountfromPledge={pledgeAmount}
            onChange={onChange}
            name="pledgeAmount"
            updateStockAndProjectStatus={updateStockAndProjectStatus}
          />
        )}
      </div>
    );
  });
};
