import { render, screen, act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Home } from "../../components/homepage/Home";
import { Router } from "react-router-dom";
import { SightingListResponse } from "../../clients/internalApiClient";
import * as apiClient from "../../clients/internalApiClient";

const sightingDummyData: SightingListResponse = {
  sightings: [
    {
      id: 1,
      latitude: 0,
      longitude: 0,
      date: "2022-07-06",
      description: "A sighting",
      photoUrl: "",
      species: {
        id: 1,
        name: "Blue whale",
        latinName: "Blueus Whaleus",
        endangeredStatus: "Not Endangered, I Hope",
        imageUrl: "",
        description: "A whale, coloured blue",
      },
      isApproved: true,
    },
    {
      id: 2,
      latitude: 30,
      longitude: 50,
      date: "2022-07-06",
      description: "A sighting, very amazing",
      photoUrl: "",
      species: {
        id: 1,
        name: "Blue whale",
        latinName: "Blueus Whaleus",
        endangeredStatus: "Not Endangered, I Hope",
        imageUrl: "",
        description: "A whale, coloured blue",
      },
      isApproved: false,
    },
  ],
};

test("renders whale spotting text to screen", () => {
  render(<Home />);
  const elements = screen.getAllByText(/whale spotting/i);
  expect(elements[0]).toBeInTheDocument();
});

test("renders map component to screen", () => {
  const { container } = render(<Home />);
  const map = container.getElementsByClassName("leaflet-container");
  expect(map[0]).toBeInTheDocument();
});

test('When rendered, sends a fetch request to the "getSightings" endpoint in the backend', () => {
  const history = createMemoryHistory();

  const fetchSightings = jest
    .spyOn(apiClient, "fetchSightings")
    .mockImplementation(async () => sightingDummyData);

  act(() => {
    render(
      <Router history={history}>
        <Home />
      </Router>
    );
  });

  expect(fetchSightings).toBeCalled();
});
