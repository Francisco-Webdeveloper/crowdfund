import styles from "./CampaignList.module.scss";
import { ProductCampaignList } from "../ProductCampaignList";

export const CampaignList = ({
  campaigns,
  noRewardPledge,
  noRewardPledgeDescription,
  formData,
  onChange,
}) => {
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
            onChange={onChange}
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
        onChange={onChange}
      />
    </form>
  );
};
