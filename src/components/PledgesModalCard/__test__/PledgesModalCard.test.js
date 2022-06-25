import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PledgesModalCard } from "../index";

const onClickMock = jest.fn();

describe("PledgesModalCard", () => {
  it("Should close the modal when close icon is clicked", () => {
    render(<PledgesModalCard onClick={onClickMock} showModal={true} />);
    const closeIconElement = screen.getByAltText("close-modal");
    userEvent.click(closeIconElement);
  });
});
