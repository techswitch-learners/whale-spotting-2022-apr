import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { SightingCard } from "../../components/sightingCard/sightingCard";

const testSighting = {
  id: 1,
  latitude: 54.682709,
  longitude: -43.553958,
  description: "Nice place",
  date: "2021-10-21 00:00:00",
  photoUrl:
    "https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2017/05/humpback-1209297_1920.jpg?w=1600&ssl=1",
  species: {
    id: 2,
    name: "Beluga whale",
    latinName: "Beluga whale",
    endangeredStatus: "endangered",
    imageUrl: "https://s.hdnux.com/photos/01/24/11/10/22057501/4/2400x0.jpg",
    description:
      "The orca or killer whale (Orcinus orca) is a toothed whale belonging to the oceanic dolphin family, of which it is the largest member. ",
  },
  isApproved: true,
};

test("Should render with information about the sighting", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SightingCard sighting={testSighting} />
    </Router>
  );

  const elements = screen.getAllByText(/Beluga/i);
  expect(elements[0]).toBeInTheDocument();
});
