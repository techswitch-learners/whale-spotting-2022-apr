import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";

test("contains whale spotting logo", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Navbar />
    </Router>
  );
  const elements = screen.getAllByRole("img", { name: "Whale Spotting logo" });
  expect(elements[0]).toBeInTheDocument();
});
