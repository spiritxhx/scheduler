import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import Application from "components/Application";
import { getByText, prettyDOM } from "@testing-library/react";

const { getyByText } = render(<Application />);

afterEach(cleanup);

describe("Application", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(()=>{
      getByText(container, "Archie Cohen")
    });
    console.log(prettyDOM(container));
  });
});
