import { render, screen, act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { SightingPage } from "../../components/SightingPage/SightingPage";
import * as apiClient from "../../clients/internalApiClient";

test('When rendered with a route, sends a fetch request to the "get sighting by ID" endpoint in the backend', () => {
  const history = createMemoryHistory({ initialEntries: ["/sightings/1"] });

  const fetchSightingById = jest
    .spyOn(apiClient, "fetchSightingById")
    .mockImplementation(async (id: number) => ({
      id: id,
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
    }));

  act(() => {
    render(
      <Router history={history}>
        <SightingPage />
      </Router>
    );
  });

  expect(fetchSightingById).toBeCalled();
});

test("When rendered with a route, displays the information of the sighting with that ID", async () => {
  const history = createMemoryHistory({ initialEntries: ["/sightings/1"] });
  jest
    .spyOn(apiClient, "fetchSightingById")
    .mockImplementation(async (id: number) => ({
      id: id,
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
    }));

  await act(async () => {
    render(
      <Router history={history}>
        <SightingPage />
      </Router>
    );
  });

  expect(
    await screen.findByText(/description: a sighting/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/blue whale/i)).toBeInTheDocument();
});
