import { useState } from "react";

export const HeroImage = ({ image, imageXl }) => {
  const [windowSizeSmall, setWindowSizeSmall] = useState(false);

  const isWindowSizeSmall = () => {
    if (window.innerWidth < 768) {
      setWindowSizeSmall(true);
    } else {
      setWindowSizeSmall(false);
    }
  };

  window.addEventListener("resize", isWindowSizeSmall);

  const imageSize = windowSizeSmall ? image : imageXl;

  const style = { maxWidth: "100%", height: "auto" };

  return (
    <div data-testid="hero-image">
      <img
        src={process.env.PUBLIC_URL + `/images/${imageSize}`}
        alt="hero"
        style={style}
      />
    </div>
  );
};
