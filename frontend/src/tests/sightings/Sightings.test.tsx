import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Sightings } from "../../components/sightings/sightings";

test("Should render without error", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Sightings />
    </Router>
  );

  const elements = screen.getAllByText(/Sightings/i);
  expect(elements[0]).toBeInTheDocument();
});
