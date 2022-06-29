import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Project from "../index";

const mockedProject = {
  id: "1",
  moneyBacked: 89914,
  totalBackers: 5007,
  daysLeft: 56,
  goal: 100000,
  title: "Mastercraft Bamboo Monitor Riser",
  description:
    "A beautifully handcrafted monitor stand to reduce neck and eye strain.",
  about:
    "The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand. \n\nFeaturing artisan craftsmanship, the simplicity of design creates extr desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.",
  modalIntroduction:
    "Want to support us in bringing Mastercraft Bamboo Monitor Riser our in the world?",
  confirmationPledgeText:
    "Your pledge bring us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.",
};

const mockedPledges = [
  {
    id: "Bamboo Stand",
    pledgeAmount: 25,
    description:
      " You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
    stock: 101,
  },
  {
    id: "Black Edition Stand",
    pledgeAmount: 75,
    description:
      "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
    stock: 64,
  },
];

const MockProject = () => {
  return (
    <BrowserRouter>
      <Project pledges={mockedPledges} project={mockedProject} />
    </BrowserRouter>
  );
};

const getPledgesListModal = () => {
  render(<MockProject />);
  const selectRewardButtonElements = screen.getAllByRole("button", {
    name: "Select Reward",
  });
  userEvent.click(selectRewardButtonElements[0]);
  const pledgesModalElement = screen.getByTestId("pledges-modal");
  expect(pledgesModalElement).toBeInTheDocument();
};

const getSelectedPledgeCard = () => {
  const selectedPledgeCardElement = screen.getAllByTestId("pledge-card")[0];
  expect(selectedPledgeCardElement).toHaveClass("pledgeCardSelected");
  const selectedPledgeInput = screen.getAllByTestId("pledge-input")[0];
  expect(selectedPledgeInput).toBeInTheDocument();
};

const changeInputValueAndSendPledge = () => {
  const inputElement = screen.getByLabelText("$");
  userEvent.type(inputElement, "25");
  expect(inputElement.value).toBe("25");
  const continueButtonElement = screen.getByRole("button", {
    name: "Continue",
  });
  userEvent.click(continueButtonElement);
};

describe("Project - show modal", () => {
  it("Should open pledges modal when 'Back this project' button is clicked", () => {
    render(<MockProject />);
    const backProjectButtonElement = screen.getByRole("button", {
      name: "Back this project",
    });
    userEvent.click(backProjectButtonElement);
    const pledgesModalElement = screen.getByTestId("pledges-modal");
    expect(pledgesModalElement).toBeInTheDocument();
  });
});

describe("Project - inside the modal", () => {
  beforeEach(() => {
    getPledgesListModal();
  });

  it("'Select Reward' buttons clicked should open pledges modal", () => {});

  it("Renders pledges modal with selected pledge and input", () => {
    getSelectedPledgeCard();
  });
});

describe("Project - update project data", () => {
  beforeEach(() => {
    getPledgesListModal();
    getSelectedPledgeCard();
    changeInputValueAndSendPledge();
  });

  it("Should be able to update stock when 'Continue' button clicked", () => {
    const stockElement = screen.getByTestId("stock-left-Bamboo Stand");
    expect(stockElement.textContent).toBe("100");
  });

  it("Should be able to update total money backed when 'Continue' button clicked", () => {
    const moneyBackedElement = screen.getByTestId("total-money-backed");
    expect(moneyBackedElement.textContent).toBe("$89,939");
  });

  it("Should be able to update the progress bar", () => {
    const progressBarElement = screen.getByRole("progressbar");
    expect(progressBarElement).toHaveStyle("width: 89.939%");
  });

  it("Should be able to update total backers when 'Continue' button clicked", () => {
    const totalBackersElement = screen.getByTestId("total-backers");
    console.log(prettyDOM(totalBackersElement));
    // FAILED - Does not update total backers
    expect(totalBackersElement.textContent).toBe("5,008");
  });
});
