import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectHeader } from "../index";

const onClickMock = jest.fn();

describe("ProjectHeader", () => {
  it("Should render the project's title", () => {
    render(
      <ProjectHeader
        title="My title"
        description="My description"
        onClick={onClickMock}
      />
    );
    const titleElement = screen.getByRole("heading");
    expect(titleElement).toBeInTheDocument();
  });

  it("Should render project's description", () => {
    render(
      <ProjectHeader
        title="My title"
        description="My description"
        onClick={onClickMock}
      />
    );
    const descriptionElement = screen.getByTestId("project-description");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("Should render 'Back this project' button", () => {
    render(
      <ProjectHeader
        title="My title"
        description="My description"
        onClick={onClickMock}
      />
    );
    const backProjectButtonElement = screen.getByRole("button", {
      name: "Back this project",
    });
    expect(backProjectButtonElement).toBeInTheDocument();
  });

  it("Should render the 'Bookmark' button", () => {
    render(
      <ProjectHeader
        title="My title"
        description="My description"
        onClick={onClickMock}
      />
    );
    const bookmarkButtonElement = screen.getByTestId("bookmark");
    expect(bookmarkButtonElement).toBeInTheDocument();
  });

  it("'Bookmark' button text should toggle between 'Bookmarked' and 'Bookmark' when clicked", () => {
    render(
      <ProjectHeader
        title="My title"
        description="My description"
        onClick={onClickMock}
      />
    );
    const bookmarkButtonElement = screen.getByTestId("bookmark");
    const bookmarkTextButtonElement = screen.getByTestId(
      "bookmark-button-text"
    );
    userEvent.click(bookmarkButtonElement);
    expect(bookmarkTextButtonElement.textContent).toBe("Bookmarked");
    userEvent.click(bookmarkButtonElement);
    expect(bookmarkTextButtonElement.textContent).toBe("Bookmark");
  });

  it("'Bookmark' button should toggle colors when clicked", () => {
    render(
      <ProjectHeader
        title="My title"
        description="My description"
        onClick={onClickMock}
      />
    );
    const bookmarkButtonElement = screen.getByTestId("bookmark");
    const bookmarkIconElement = screen.getByTestId("bookmark-icon");
    const bookmarkTextButtonElement = screen.getByTestId(
      "bookmark-button-text"
    );
    userEvent.click(bookmarkButtonElement);
    expect(bookmarkTextButtonElement.className).toBe("bookmarked");
    expect(bookmarkIconElement).toHaveClass("bookmarkIconActive");

    userEvent.click(bookmarkButtonElement);
    expect(bookmarkTextButtonElement.className).toBe("notBookmarked");
    expect(bookmarkIconElement).not.toHaveClass("bookmarkIconActive");
  });
});
