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
    const { name } = event.target;
    let value;
    name === "pledgeAmount"
      ? (value = event.target.value.replace(/\D/g, ""))
      : (value = event.target.value);

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
      <div
        className={
          formData.pledgeCard === "noReward"
            ? styles.campaignCardSelected
            : styles.campaignCard
        }
      >
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
