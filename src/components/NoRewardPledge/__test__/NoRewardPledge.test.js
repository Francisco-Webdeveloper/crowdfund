import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NoRewardPledge } from "../index";

describe("NoRewardPledge", () => {
  it("Should render pledge button when pledge selected", () => {
    render(<NoRewardPledge pledgeId="noReward" />);
    const inputElement = screen.getByLabelText(/Pledge with no reward/i);
    // userEvent.type(inputElement, "noReward"); => why is this not needed??
    expect(inputElement.value).toBe("noReward");
    const buttonElement = screen.getByRole("button", { name: /Continue/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
