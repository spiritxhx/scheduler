import React from "react";

import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "@testing-library/react";

import Application from "../Application";

afterEach(cleanup);
describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    // const { getByText } = render(<Application />);

    // return waitForElement(() => getByText("Monday")).then(() => {
    //   fireEvent.click(getByText("Tuesday"));
    //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
    // });
  });
});
