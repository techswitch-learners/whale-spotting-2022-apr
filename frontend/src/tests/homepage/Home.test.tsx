import { render, screen, waitFor } from "@testing-library/react";
import { Home } from "../../components/homepage/Home";
import { SightingListResponse } from "../../clients/internalApiClient";
import * as apiClient from "../../clients/internalApiClient";

const sightingsDummyData: SightingListResponse = {
  sightings: [
    {
      id: 1,
      latitude: 51.5072,
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
      latitude: 51.5072,
      longitude: 1,
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
      isApproved: true,
    },
    {
      id: 3,
      latitude: 51.5072,
      longitude: 3,
      date: "2022-07-06",
      description: "A sighting, very very amazing",
      photoUrl: "",
      species: {
        id: 3,
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

test("renders all markers", async () => {
  const fetchSightings = jest
    .spyOn(apiClient, "fetchSightings")
    .mockImplementation(async () => sightingsDummyData);
  render(<Home />);
  await waitFor(() => expect(fetchSightings).toBeCalled());
  await waitFor(() => expect(screen.queryAllByRole("marker")).toHaveLength(2));
});
