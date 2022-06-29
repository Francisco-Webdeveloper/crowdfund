import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pledge } from "../index";

const onClickMock = jest.fn();

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

  it("Button should be disabled if input value < 25", () => {
    // FAILED
    render(
      <Pledge
        minimumAmount="25"
        id="Bamboo Stand"
        onContinueButtonClick={onClickMock}
      />
    );
    const inputElement = screen.getByLabelText("$");
    const continueButtonElement = screen.getByRole("button", {
      name: "Continue",
    });
    userEvent.type(inputElement, "24");
    expect(inputElement.value).toBe("24");
    userEvent.click(continueButtonElement);
    expect(continueButtonElement).toBeDisabled();
    // expect(continueButtonElement).toHaveAttribute("disabled");
  });

  it("Button should be enabled if input value >= 25", () => {
    // FAILED
    render(
      <Pledge
        minimumAmount={25}
        id="Bamboo Stand"
        onContinueButtonClick={onClickMock}
      />
    );
    const inputElement = screen.getByLabelText("$");
    userEvent.type(inputElement, "25");
    expect(inputElement.value).toBe("25");
    const continueButtonElement = screen.getByRole("button", {
      name: "Continue",
    });
    //userEvent.click(continueButtonElement);
    expect(continueButtonElement).toBeEnabled();
    // expect(continueButtonElement).toHaveAttribute("disabled");
  });
  it("Should render low value error message if input value < 25", () => {
    // FAILED - unable to select paragraph with error msg
    render(<Pledge minimumAmount="25" id="Bamboo Stand" />);
    const inputElement = screen.getByLabelText("$");

    userEvent.type(inputElement, "24");
    const erroMsgElement = screen.getByText(/greater than or equal to/i);
    expect(erroMsgElement).toBeInTheDocument();
  });
});
