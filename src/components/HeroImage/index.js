import { useState } from "react";

export const HeroImage = ({ image, imageXl }) => {
  const [windowSizeSmall, setWindowSmall] = useState(false);

  const isWindowSizeSmall = () => {
    if (window.innerWidth < 768) {
      setWindowSmall(true);
    } else {
      setWindowSmall(false);
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
