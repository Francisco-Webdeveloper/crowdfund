import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Project from "../Project";

const MockProject = () => {
  return (
    <BrowserRouter>
      <Project />
    </BrowserRouter>
  );
};

describe("Project", () => {
  // TEST FAILED!!
  it("Should open pledges modal when 'Back this project' button is clicked", () => {
    render(<MockProject />);
    const backProjectButtonElement = screen.getByRole("button", {
      name: "Back this project",
    });
    const pledgesModalElement = screen.getByTestId("pledges-modal");
    userEvent.click(backProjectButtonElement);
    expect(pledgesModalElement).toBeInTheDocument();
  });
});
