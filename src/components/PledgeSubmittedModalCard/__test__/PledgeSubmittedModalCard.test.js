import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { PledgeSubmittedModalCard } from "../index";

const MockPledgeSubmittedModalCard = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <BrowserRouter>
      <PledgeSubmittedModalCard
        onCloseClick={() => {
          setShowModal(false);
        }}
        showModal={showModal}
      />
    </BrowserRouter>
  );
};

describe("PledgeSubmittedModalCard", () => {
  it("should render modal content", () => {
    render(<MockPledgeSubmittedModalCard />);
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
    // FAILED - mismatch between expected and received
    render(<MockPledgeSubmittedModalCard />);

    const buttonElement = screen.getByRole("button", {
      name: "Got it",
    });

    // console.log(prettyDOM(modalElement));
    userEvent.click(buttonElement);

    const modalElement = screen.getByTestId("pledge-submitted-modal");

    expect(modalElement).toBeNull();
  });
});
