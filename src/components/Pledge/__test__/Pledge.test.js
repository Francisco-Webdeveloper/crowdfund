import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pledge } from "../index";

describe("Pledge", () => {
  it("Should be able to type in input", () => {
    render(<Pledge />);
    const inputElement = screen.getByLabelText("$");
    userEvent.type(inputElement, "25");
    expect(inputElement.value).toBe("25");
  });

  it("Should not be able to type in any characters but numbers", () => {
    render(<Pledge />);
    const inputElement = screen.getByLabelText("$");
    userEvent.type(inputElement, "hello");
    expect(inputElement.value).not.toBe("hello");
  });

  it("Button should be enabled if input value >= 25", () => {
    // FAILED - button is always disabled
    render(<Pledge minimumAmount="25" />);
    const inputElement = screen.getByLabelText("$");
    const continueButtonElement = screen.queryByRole("button", {
      name: "Continue",
    });
    userEvent.type(inputElement, "25");
    expect(inputElement.value).toBe("25");
    userEvent.click(continueButtonElement);
    expect(continueButtonElement).not.toBeDisabled();
  });

  it("Should render low value error message if input value < 25", () => {
    // FAILED - unable to select paragraph with error msg
    render(<Pledge minimumAmount="25" id="Bamboo Stand" />);
    const inputElement = screen.getByLabelText("$");

    userEvent.type(inputElement, "24");
    const erroMsgElement = screen.getByText(/greater than or equal to/i);
    // const erroMsgElement = screen.getByTestId("low-value-error");
  });
});
