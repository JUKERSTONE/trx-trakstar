import React from "react";
import { render, screen } from "@testing-library/react";
import { TSBM3DIAApp } from "./app";

test("renders learn react link", () => {
  render(<TSBM3DIAApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
