import { useCountdown } from "../../hooks/useCountdown";
import styles from "./CountdownTimer.module.scss";

export const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const projectDurationInMs = days + hours + minutes + seconds;

  return projectDurationInMs <= 0 ? (
    <div className={styles.expiredNotice}>
      <span>
        Project<br></br>expired
      </span>
    </div>
  ) : (
    <div className={styles.daysLeft}>
      <div className={days <= 3 ? styles.danger : null}>
        <h1>{days}</h1>
        <p>days left</p>
      </div>
    </div>
  );
};
