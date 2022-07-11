import styles from "./StatusCard.module.scss";
import { ProgressBar } from "react-bootstrap";
import { CountdownTimer } from "../CountdownTimer";

export const StatusCard = ({ daysLeft, projectStatus, goal }) => {
  console.log({ projectStatus });
  const DAYS_IN_MS = daysLeft * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterProjectDuration = NOW_IN_MS + DAYS_IN_MS;

  return (
    <div className={styles.status}>
      <div className={styles.moneyBacked}>
        <h1 data-testid="total-money-backed">
          ${projectStatus.moneyBacked.toLocaleString("en-US")}
        </h1>
        <p>of ${goal.toLocaleString("en-US")} backed</p>
      </div>
      <div className={styles.totalBackers}>
        <h1 data-testid="total-backers">
          {projectStatus.totalBackers.toLocaleString("en-US")}
        </h1>
        <p>total backers</p>
      </div>
      <CountdownTimer targetDate={dateTimeAfterProjectDuration} />
      <ProgressBar
        now={(projectStatus.moneyBacked / goal) * 100}
        className={styles.progressBar}
        variant="info"
        data-testid="progress-bar"
      />
    </div>
  );
};
