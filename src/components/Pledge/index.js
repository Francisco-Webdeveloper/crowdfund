import styles from "./Pledge.module.scss";

export const Pledge = ({ pledgeAmount, onChange }) => {
  return (
    <div className={styles.enterPledge}>
      <p>Enter your pledge</p>
      <input
        type="text"
        pattern="[0-9]*"
        value={pledgeAmount}
        placeholder="$"
        onChange={onChange}
      />
      <button>continue</button>
    </div>
  );
};
