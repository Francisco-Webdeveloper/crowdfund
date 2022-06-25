import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  it("Should render logo", () => {
    render(<MockNavBar />);
    const logoElement = screen.getByRole("heading", { name: "crowdfund" });
    expect(logoElement.textContent).toBe("crowdfund");
  });

  it("Should render the navbar links", () => {
    render(<MockNavBar />);
    const linkElements = screen.getAllByRole("listitem");
    expect(linkElements.length).toBe(3);
  });

  it("Navbar links should be 'About', 'Discover' and 'Get Started'", () => {
    render(<MockNavBar />);
    const linkNames = ["About", "Discover", "Get Started"];
    linkNames.forEach((link) => {
      const linkElement = screen.getByText(link);
      expect(linkElement.textContent).toBe(link);
    });
  });

  it("Navbar should not show transparent background when window < 305px", () => {
    render(<MockNavBar />);
    const navbarElement = screen.getByRole("navigation");
    fireEvent.scroll(window, { target: { scrollY: 304 } });
    expect(navbarElement).not.toHaveClass("active");
  });

  it("Navbar should show white background when window >= 305px", () => {
    render(<MockNavBar />);
    const navbarElement = screen.getByRole("navigation");
    fireEvent.scroll(window, { target: { scrollY: 305 } });
    expect(navbarElement).toHaveClass("navbar active");
  });

  it("Should go to the top of the page when logo clicked", () => {
    render(<MockNavBar />);
    const logoElement = screen.getByRole("heading", { name: "crowdfund" });
    userEvent.click(logoElement);
    // const idElement = document.getElementById("#top");
    // expect(idElement).toBeInTheDocument();
  });
});
