import styles from "./StatusCard.module.scss";
import { ProgressBar } from "react-bootstrap";
import { CountdownTimer } from "../CountdownTimer";

export const StatusCard = ({ daysLeft, projectStatus, goal }) => {
  const SIXTY_DAYS_IN_MS = 60 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterSixtyDays = NOW_IN_MS + SIXTY_DAYS_IN_MS;

  return (
    <div className={styles.status}>
      <div className={styles.moneyBacked}>
        <h1>${projectStatus.moneyBacked}</h1>
        <p>of ${goal} backed</p>
      </div>
      <div className={styles.totalBackers}>
        <h1>{projectStatus.totalBackers}</h1>
        <p>total backers</p>
      </div>
      {/* <div className={styles.daysLeft}>
        <h1>{daysLeft}</h1>
        <p>days left</p>
      </div> */}
      <CountdownTimer targetDate={dateTimeAfterSixtyDays} />
      <ProgressBar
        now={(projectStatus.moneyBacked / goal) * 100}
        className={styles.progressBar}
        variant="info"
      />
    </div>
  );
};
