import { useState } from "react";
import styles from "./CampaignList.module.scss";
import { ProductCampaignList } from "../ProductCampaignList";

export const CampaignList = ({
  campaigns,
  noRewardPledge,
  noRewardPledgeDescription,
}) => {
  const [formData, setFormData] = useState({
    pledgeCard: "",
    pledgeAmount: "",
  });

  // update the state with value of the radio buttons
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <ProductCampaignList
        campaigns={campaigns}
        formData={formData}
        onChange={handleChange}
      />
    </form>
  );
};
