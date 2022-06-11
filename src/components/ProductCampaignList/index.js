import { Pledge } from "../Pledge";
import styles from "./ProductCampaignList.module.scss";

export const ProductCampaignList = ({
  campaigns,
  formData,
  onChange,
  ...rest
}) => {
  return campaigns.map(({ product, pledgeAmount, description, stock }) => {
    const disabled = stock > 0 ? false : true;
    const campaignCardSelected = product === formData.pledgeCard;

    let campaignCardClassName;
    if (stock > 0) {
      if (campaignCardSelected) {
        campaignCardClassName = styles.campaignCardSelected;
      } else {
        campaignCardClassName = styles.campaignCard;
      }
    } else {
      campaignCardClassName = styles.campaignCardDisabled;
    }

    return (
      <div key={product} className={campaignCardClassName} id="reward">
        <div className={styles.inputLabelAndPledgeAmount}>
          <input
            type="radio"
            id={product}
            name="pledgeCard"
            value={product}
            checked={formData.pledgeCard === product} // React is in charge of controlling the input rather than the input having its own html state
            onChange={onChange}
            disabled={disabled}
          />
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
        {campaignCardSelected && (
          <Pledge
            pledgeAmountInput={formData.pledgeAmount}
            pledgeAmountCampaign={pledgeAmount}
            onChange={onChange}
            formData={formData}
            name="pledgeAmount"
            {...rest}
          />
        )}
      </div>
    );
  });
};
