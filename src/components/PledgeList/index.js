import styles from "./PledgeList.module.scss";
import { NoRewardPledge } from "../NoRewardPledge";
import { Pledge } from "../Pledge";

export const PledgeList = ({
  pledges,
  selectedPledge,
  onPledgeSelect,
  onSubmit,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.elements["pledgeAmount"].id);
    const { id, value } = event.target.elements["pledgeAmount"];
    onSubmit(id, value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <NoRewardPledge
          pledgeId={selectedPledge.pledgeId}
          onPledgeSelect={onPledgeSelect}
        />
      </form>
      {pledges.map(({ id, pledgeAmount, description, stock, name }) => {
        const disabled = stock > 0 ? false : true;
        const pledgeCardSelected = id === selectedPledge.pledgeId;

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
          <form onSubmit={handleSubmit} key={id}>
            <div
              className={pledgeCardClassName}
              id="reward"
              data-testid="pledge-card"
            >
              <div className={styles.inputLabelAndPledgeAmount}>
                <input
                  type="radio"
                  id={id}
                  name="pledgeId"
                  value={id}
                  checked={pledgeCardSelected}
                  onChange={onPledgeSelect}
                  disabled={disabled}
                />
                <div className={styles.labelAndPledgeAmount}>
                  <label htmlFor={id} className={styles.product}>
                    {name}
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
                <Pledge id={id} minimumAmount={pledgeAmount} />
              )}
            </div>
          </form>
        );
      })}
    </>
  );
};
