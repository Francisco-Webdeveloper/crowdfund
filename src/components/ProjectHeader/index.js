import styles from "./ProjectHeader.module.scss";
import logo from "../../icons/logo-mastercraft.svg";
import { ReactComponent as BookmarkIcon } from "../../icons/icon-bookmark.svg";
import { useState } from "react";

export const ProjectHeader = ({ title, description, onClick }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarks = () => {
    setBookmarked((prevBookmarked) => !prevBookmarked);
  };

  return (
    <div className={styles.backProjectCard}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.buttons}>
        <button className={styles.backProjectBtn} onClick={onClick}>
          Back this project
        </button>

        <div onClick={handleBookmarks}>
          <BookmarkIcon
            className={
              bookmarked
                ? `${styles.bookmarkIconMobile} ${styles.bookmarkIconActive}`
                : styles.bookmarkIconMobile
            }
          />
          <button className={styles.bookmarkBtn}>
            <BookmarkIcon
              className={
                bookmarked
                  ? `${styles.bookmarkIconDesktop} ${styles.bookmarkIconActive}`
                  : styles.bookmarkIconDesktop
              }
            />
            <span
              className={bookmarked ? styles.bookmarked : styles.notBookmarked}
            >
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
