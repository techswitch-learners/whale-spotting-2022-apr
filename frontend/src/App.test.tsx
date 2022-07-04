import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders whale spotting text to screen", () => {
  render(<App />);
  const elements = screen.getAllByText(/whale spotting/i);
  expect(elements[0]).toBeInTheDocument();
});

test("contains whale spotting logo", () => {
  render(<App />);
  const elements = screen.getAllByRole("img", { name: "Whale Spotting logo" });
  expect(elements[0]).toBeInTheDocument();
});
