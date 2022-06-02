import { useState } from "react";
import styles from "./CampaignList.module.scss";
import { Pledge } from "../Pledge";

export const CampaignList = ({
  campaigns,
  noRewardPledge,
  noRewardPledgeDescription,
}) => {
  const [formData, setFormData] = useState({
    pledgeCard: "",
    pledgeAmount: 0,
  });

  // update the state with value of the radio buttons
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const campaignsList = campaigns.map(
    ({ product, pledgeAmount, description, stock }) => {
      const campaignCardClassName =
        stock > 0 ? styles.campaignCard : styles.campaignCardDisabled;
      const disabled = stock > 0 ? false : true;
      return (
        <div key={product} className={campaignCardClassName}>
          <div className={styles.inputLabelAndPledgeAmount}>
            <input
              type="radio"
              id={product}
              name="pledgeCard"
              value={product}
              checked={formData.pledgeCard === product} // React is in charge of controlling the input rather than the input having its own html state
              onChange={handleChange}
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
          {product === formData.pledgeCard ? (
            <Pledge
              pledgeAmount={formData.pledgeAmount}
              onChange={handleChange}
            />
          ) : null}
        </div>
      );
    }
  );

  return (
    <form type="radio">
      <div className={styles.campaignCard}>
        <div className={styles.inputAndLabel}>
          <input
            type="radio"
            id="noReward"
            name="pledgeCard"
            value="noReward"
            checked={formData.pledgeCard === "noReward"}
            onChange={handleChange}
          />
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
