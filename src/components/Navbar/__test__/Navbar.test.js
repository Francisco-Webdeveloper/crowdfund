import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "../index";

const MockNavBar = () => {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe("Navbar", () => {
  test("Should render logo", () => {
    render(<MockNavBar />);
    const logoElement = screen.getByRole("heading", { name: "crowdfund" });
    expect(logoElement.textContent).toBe("crowdfund");
  });

  test("Should render the navbar links", () => {
    render(<MockNavBar />);
    const linkElements = screen.getAllByRole("listitem");
    expect(linkElements.length).toBe(3);
  });

  test("Navbar links should be 'About', 'Discover' and 'Get Started'", () => {
    render(<MockNavBar />);
    const linkNames = ["About", "Discover", "Get Started"];
    linkNames.forEach((link) => {
      const linkElement = screen.getByText(link);
      expect(linkElement.textContent).toBe(link);
    });
  });

  test("Navbar should not show white background when window < 305px", () => {
    render(<MockNavBar />);
    const navbarElement = screen.getByRole("navigation");
    fireEvent.scroll(window, { target: { scrollY: 304 } });
    expect(navbarElement).not.toHaveClass("active");
  });

  test("Navbar should show white background when window >= 305px", () => {
    render(<MockNavBar />);
    const navbarElement = screen.getByRole("navigation");
    fireEvent.scroll(window, { target: { scrollY: 305 } });
    expect(navbarElement).toHaveClass("navbar active");
  });
});
