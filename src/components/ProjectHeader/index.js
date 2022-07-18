import styles from "./ProjectHeader.module.scss";
import logo from "../../icons/logo-mastercraft.svg";
import { ReactComponent as BookmarkIcon } from "../../icons/icon-bookmark.svg";
import { useState } from "react";
import { database } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const ProjectHeader = ({
  id,
  title,
  description,
  onClick,
  isBookmarked,
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmarks = () => {
    const projectRef = doc(database, "projects", id);
    updateDoc(projectRef, {
      bookmarked: !bookmarked,
    }).then(() => {
      setBookmarked((prevBookmarked) => !prevBookmarked);
    });
  };

  return (
    <div className={styles.backProjectCard}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h2 className={styles.title}>{title}</h2>
      <p data-testid="project-description" className={styles.description}>
        {description}
      </p>
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
          <button className={styles.bookmarkBtn} data-testid="bookmark">
            <BookmarkIcon
              className={
                bookmarked
                  ? `${styles.bookmarkIconDesktop} ${styles.bookmarkIconActive}`
                  : styles.bookmarkIconDesktop
              }
              data-testid="bookmark-icon"
            />
            <span
              data-testid="bookmark-button-text"
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
