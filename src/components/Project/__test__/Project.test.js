import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Project from "../index";

const mockProjects = [
  {
    identifier: "1",
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
    coverImage: "image-hero-375x300.jpg",
    coverImageXl: "image-hero-1440x400.jpg",
  },
  {
    identifier: "2",
    moneyBacked: 30914,
    totalBackers: 1007,
    daysLeft: 56,
    goal: 100000,
    title: "LEO Series 3.0 Leather Bags",
    description: "Ideal for a city slicker with a flair for technology.",
    about:
      "LEO Series 3.0 Leather Bags for Work (and Life). A means of transporting items from one place to another — be that your mobile technology, school books, food, supplies, or whatever else, ideal for your daily life.",
    modalIntroduction:
      "Want to support us in bringing LEO Series 3.0 out in the world?",
    confirmationPledgeText:
      "Your pledge bring us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.",
    coverImage: "image-hero-small-bag.jpg",
    coverImageXl: "image-hero-1440x400-bag.jpg",
  },
];

const mockPledges = [
  {
    description:
      "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
    id: "Black Edition Stand",
    pledgeAmount: 75,
    stock: 53,
    name: "Black Edition Stand",
  },
];

jest.mock("../../../services/project", () => ({
  collectProjectsDataFromFirebase: () => mockProjects,
  getProject: () => mockProjects[0],
  getPledges: () => mockPledges,
}));

const MockProject = () => {
  return (
    <BrowserRouter>
      <Project pledges={mockPledges} project={mockProjects[0]} />
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
  const inputElement = screen.getByTestId("input-value");
  userEvent.type(inputElement, "95");
  expect(inputElement.value).toBe("95");
  const continueButtonElement = screen.getByRole("button", {
    name: "Continue",
  });
  userEvent.click(continueButtonElement);
};

describe("Project", () => {
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

    it("Should be able to show confirmation modal when 'Continue' button clicked", () => {
      const gotItButton = screen.getByRole("button", { name: "Got it" });
      expect(gotItButton).toBeInTheDocument();
    });

    it("Should be able to update stock when 'Continue' button clicked", () => {
      const stockElement = screen.getByTestId("stock-left-Black Edition Stand");
      expect(stockElement.textContent).toBe("52");
    });

    it("Should be able to update total money backed when 'Continue' button clicked", () => {
      const moneyBackedElement = screen.getByTestId("total-money-backed");
      expect(moneyBackedElement.textContent).toBe("$90,009");
    });

    it("Should be able to update the progress bar", () => {
      const progressBarElement = screen.getByRole("progressbar");
      expect(progressBarElement).toHaveStyle("width: 90.009%");
    });

    it("Should be able to update total backers when 'Continue' button clicked", () => {
      const totalBackersElement = screen.getByTestId("total-backers");
      // console.log(prettyDOM(totalBackersElement));
      expect(totalBackersElement.textContent).toBe("5,008");
    });
  });
});
