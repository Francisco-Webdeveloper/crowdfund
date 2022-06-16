import styles from "./StatusCard.module.scss";
import { ProgressBar } from "react-bootstrap";
import { CountdownTimer } from "../CountdownTimer";

export const StatusCard = ({ daysLeft, projectStatus, goal }) => {
  const DAYS_IN_MS = daysLeft * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterProjectDuration = NOW_IN_MS + DAYS_IN_MS;

  return (
    <div className={styles.status}>
      <div className={styles.moneyBacked}>
        <h1>${projectStatus.moneyBacked.toLocaleString("en-US")}</h1>
        <p>of ${goal.toLocaleString("en-US")} backed</p>
      </div>
      <div className={styles.totalBackers}>
        <h1>{projectStatus.totalBackers.toLocaleString("en-US")}</h1>
        <p>total backers</p>
      </div>
      <CountdownTimer targetDate={dateTimeAfterProjectDuration} />
      <ProgressBar
        now={(projectStatus.moneyBacked / goal) * 100}
        className={styles.progressBar}
        variant="info"
      />
    </div>
  );
};
