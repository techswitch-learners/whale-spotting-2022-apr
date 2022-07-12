import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { CreateSightingPage } from "../../components/createsighting/CreateSightingPage";
import * as apiClient from "../../clients/internalApiClient";
import { Router } from "react-router-dom";
import { SpeciesListResponse } from "../../clients/internalApiClient";
import selectEvent from "react-select-event";

test("Should render without error", () => {
  render(<CreateSightingPage />);
});

test("When rendered, all form elements are present", () => {
  render(<CreateSightingPage />);
  const dateInput = screen.getByLabelText(/date/i);
  const latitudeInput = screen.getByLabelText(/latitude/i);
  const longitudeInput = screen.getByLabelText(/longitude/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const photoInput = screen.getByLabelText(/photo/i);
  const speciesInput = screen.getByLabelText(/species/i);

  expect(dateInput).toBeInTheDocument();
  expect(latitudeInput).toBeInTheDocument();
  expect(longitudeInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(photoInput).toBeInTheDocument();
  expect(speciesInput).toBeInTheDocument();
});

// This test throws a warning about usage of "act()". I believe this is a bug
// (see https://github.com/testing-library/react-testing-library/issues/281)
// and since the fix seems to be "change how the component is written so it passes the tests",
// which goes against testing practices, I'm making the call to just ignore and
// accept this warning.
test("make sure it calls the create sighting API endpoint", () => {
  render(<CreateSightingPage />);

  const createSighting = jest
    .spyOn(apiClient, "createSighting")
    .mockImplementation(async () => {
      console.log("Called createSighting()");
    });

  act(() => {
    fireEvent.click(screen.getByText(/submit/i));
  });

  expect(createSighting).toBeCalled();
});

const species1 = {
  id: 1,
  name: "Orca",
  latinName: "Orcinus orca",
  endangeredStatus: "safe",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/3/37/Killerwhales_jumping.jpg",
  description:
    "The orca or killer whale (Orcinus orca) is a toothed whale belonging to the oceanic dolphin family, of which it is the largest member. It is recognizable by its black-and-white patterned body. A cosmopolitan species, orcas can be found in all of the world's oceans in a variety of marine environments, from Arctic and Antarctic regions to tropical seas.",
};

const species2 = {
  id: 2,
  name: "Humpback whale",
  latinName: "Megaptera novaeangliae",
  endangeredStatus: "Least Concern",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/6/61/Humpback_Whale_underwater_shot.jpg",
  description:
    "The humpback whale is a species of baleen whale. It is a rorqual; a member of the family Balaenopteridae. Adults range in length from 14–17 m and weigh up to 40 metric tons. The humpback has a distinctive body shape, with long pectoral fins and a knobbly head.",
};

test("make sure the fetchSpecies() endpoint is called", async () => {
  const history = createMemoryHistory();

  const fetchSpecies = jest
    .spyOn(apiClient, "fetchSpecies")
    .mockImplementation(async (): Promise<SpeciesListResponse> => {
      return { speciesList: [species1, species2] };
    });

  await act(async () => {
    render(
      <Router history={history}>
        <CreateSightingPage />
      </Router>
    );
  });

  expect(fetchSpecies).toBeCalled();
});

test("make sure the species names are displayed in the dropdown menu and returns the correct speciesId", async () => {
  const history = createMemoryHistory();

  jest
    .spyOn(apiClient, "fetchSpecies")
    .mockImplementation(async (): Promise<SpeciesListResponse> => {
      return { speciesList: [species1, species2] };
    });

  await act(async () => {
    render(
      <Router history={history}>
        <CreateSightingPage />
      </Router>
    );

    await selectEvent.select(screen.getByLabelText(/species/i), [
      species1.name,
    ]);
    expect(screen.getByTestId("form")).toHaveFormValues({
      species: species1.id.toString(),
    });

    await selectEvent.select(screen.getByLabelText(/species/i), [
      species2.name,
    ]);
    expect(screen.getByTestId("form")).toHaveFormValues({
      species: species2.id.toString(),
    });
  });
});
