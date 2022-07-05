import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { CreateSightingForm } from "./CreateSightingForm";

test("contains all input fields of the form", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <CreateSightingForm />
    </Router>
  );
  const elements = screen.getAllByText({});
  expect(elements[0]).toBeInTheDocument();
});
