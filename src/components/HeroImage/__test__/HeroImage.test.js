import { render, screen } from "@testing-library/react";
import { HeroImage } from "../index";

describe("HeroImage", () => {
  test("renders hero image", () => {
    render(<HeroImage />);
    const imageElement = screen.getByTestId("hero-image");
    expect(imageElement.className).toBe("hero");
  });
});
