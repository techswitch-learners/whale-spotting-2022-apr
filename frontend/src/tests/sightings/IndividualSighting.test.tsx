import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { IndividualSighting } from "../../components/individualSighting/individualSighting";

test("Should render without error", () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <IndividualSighting />
    </Router>
  );

  const elements = screen.getAllByText(/Whale spotting sighting/i);
  expect(elements[0]).toBeInTheDocument();
});
