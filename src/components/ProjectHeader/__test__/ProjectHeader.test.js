import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectHeader } from "../index";
import { useState } from "react";

// const onClickMock = jest.fn();

const MockProjectHeader = () => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <ProjectHeader
      onClick={() => {
        setBookmarked(true);
      }}
      bookmarked={bookmarked}
      title="My title"
      description="My description"
    />
  );
};

describe("ProjectHeader", () => {
  it("Should render the project's title", () => {
    render(<MockProjectHeader />);
    const titleElement = screen.getByRole("heading", { name: /My title/i });
    expect(titleElement).toBeInTheDocument();
  });

  it("Should render project's description", () => {
    render(<MockProjectHeader />);
    const descriptionElement = screen.getByTestId("project-description");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("Should render 'Back this project' button", () => {
    render(<MockProjectHeader />);
    const backProjectButtonElement = screen.getByRole("button", {
      name: "Back this project",
    });
    expect(backProjectButtonElement).toBeInTheDocument();
  });

  it("Should render the 'Bookmark' button", () => {
    render(<MockProjectHeader />);
    const bookmarkButtonElement = screen.getByTestId("bookmark");
    expect(bookmarkButtonElement).toBeInTheDocument();
  });

  it("'Bookmark' button text should toggle between 'Bookmarked' and 'Bookmark' when clicked", () => {
    render(<MockProjectHeader />);
    const bookmarkButtonElement = screen.getByTestId("bookmark");
    const bookmarkTextButtonElement = screen.getByTestId(
      "bookmark-button-text"
    );
    expect(bookmarkTextButtonElement.textContent).toBe("Bookmark");
    userEvent.click(bookmarkButtonElement);
    expect(bookmarkTextButtonElement.textContent).toBe("Bookmarked");
  });

  it("'Bookmark' button should toggle colors when clicked", () => {
    render(<MockProjectHeader />);
    const bookmarkButtonElement = screen.getByTestId("bookmark");
    const bookmarkIconElement = screen.getByTestId("bookmark-icon");
    const bookmarkTextButtonElement = screen.getByTestId(
      "bookmark-button-text"
    );
    // userEvent.click(bookmarkButtonElement);
    expect(bookmarkTextButtonElement.className).toBe("notBookmarked");
    expect(bookmarkIconElement).not.toHaveClass("bookmarkIconActive");

    userEvent.click(bookmarkButtonElement);
    expect(bookmarkTextButtonElement.className).toBe("bookmarked");
    expect(bookmarkIconElement).toHaveClass("bookmarkIconActive");
  });
});
