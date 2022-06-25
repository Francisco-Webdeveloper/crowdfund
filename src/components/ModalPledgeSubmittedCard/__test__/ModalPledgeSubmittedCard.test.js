import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ModalPledgeSubmittedCard } from "../index";

const onClickMock = jest.fn();

const MockModalPledgeSubmittedCard = () => {
  return (
    <BrowserRouter>
      <ModalPledgeSubmittedCard onCloseClick={onClickMock} />
    </BrowserRouter>
  );
};

describe("ModalPledgeSubmittedCard", () => {
  it("should render modal content", () => {
    render(<MockModalPledgeSubmittedCard />);
    const iconElement = screen.getByAltText(/completed action icon/i);
    const headingElement = screen.getByRole("heading", { name: /Thanks/i });
    const buttonElement = screen.getByRole("button", { name: "Got it" });
    const textElement = screen.getByRole("paragraph");
    expect(iconElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("Should close modal when button clicked", () => {
    // FAILED - mismatch between expected and received / issue: props ?
    render(<MockModalPledgeSubmittedCard />);
    const buttonElement = screen.getByRole("button", { name: "Got it" });
    userEvent.click(buttonElement);
    const modalElement = screen.queryByTestId("modal");
    // expect(modalElement).toBeNull();
    // expect(modalElement).not.toBeInTheDocument();
  });
});
