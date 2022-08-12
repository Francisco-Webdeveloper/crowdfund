import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";

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

const mockPledges = [];

jest.mock("../../services/project", () => ({
  collectProjectsDataFromFirebase: () => mockProjects,
  getProject: () => mockProjects[0],
  getPledges: () => mockPledges,
}));

const MockHome = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe("Home", () => {
  it("should render the first project", async () => {
    render(<MockHome />);
    const projectLinkElement = await screen.findByTestId("project-0");
    expect(projectLinkElement).toBeInTheDocument();
  });

  it("should open projects page when I click on a project link element", async () => {
    render(<MockHome />);
    const projectLinkElement = await screen.findByTestId("project-0");
    userEvent.click(projectLinkElement);
    const projectElement = await screen.findByRole("heading", {
      name: mockProjects[0].title,
    });
    expect(projectElement).toBeInTheDocument();
  });

  it("Should show the total number of projects", async () => {
    render(<MockHome />);
    const totalProjectsElement = await screen.findByTestId("total-projects");
    expect(totalProjectsElement.textContent).toBe("2");
  });

  it("Should show the total money backed from all projects", async () => {
    render(<MockHome />);
    const totalMoneyElement = await screen.findByTestId("total-money-backed");
    expect(totalMoneyElement.textContent).toBe("$120,828");
  });

  it("Should show the total number of pledges from all projects", async () => {
    render(<MockHome />);
    const totalPledgesElement = await screen.findByTestId("total-pledges");
    expect(totalPledgesElement.textContent).toBe("6,014");
  });
});
