import styles from "./ProjectHeader.module.scss";
import logo from "../../icons/logo-mastercraft.svg";
import bookmarkIcon from "../../icons/icon-bookmark.svg";

export const ProjectHeader = ({ title, description, onClick }) => {
  return (
    <div className={styles.backProjectCard}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.buttons}>
        <button className={styles.backProjectBtn} onClick={onClick}>
          Back this project
        </button>

        {/* Mobile */}
        <img
          className={styles.bookmarkIconMobile}
          src={bookmarkIcon}
          alt="bookmark"
        />

        {/* DESKTOP  */}
        <button className={styles.bookmarkBtn}>
          <img
            className={styles.bookmarkIconDesktop}
            src={bookmarkIcon}
            alt="bookmark"
          />
          <span className={styles.bookmark}>Bookmark</span>
        </button>
      </div>
    </div>
  );
};
