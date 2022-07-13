import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import * as apiClient from "../../clients/internalApiClient";
import { act } from "@testing-library/react";
import { UnapprovedSightingPage } from "../../components/unapprovedSightings/UnapprovedSightingPage";
import { SightingListResponse } from "../../clients/internalApiClient";
import { LoginContext } from "../../components/login/LoginManager";

const unapprovedSightingsDummyData: SightingListResponse = {
  sightings: [
    {
      id: 1,
      latitude: 30,
      longitude: 50,
      date: "2022-07-06",
      description: "A sighting, very amazing",
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
    {
      id: 2,
      latitude: 51.5072,
      longitude: 3,
      date: "2022-07-06",
      description: "A sighting, very very amazing",
      photoUrl: "",
      species: {
        id: 3,
        name: "Orca",
        latinName: "Orca",
        endangeredStatus: "Endangered",
        imageUrl: "",
        description: "A whale, coloured blue",
      },
      isApproved: false,
    },
  ],
};

test("Should render without error", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <UnapprovedSightingPage />
    </Router>
  );
  const elements = screen.getAllByText(/Unapproved sightings/i);
  expect(elements[0]).toBeInTheDocument();
});

test("When rendered, calls the unapproved sightings API endpoint", async () => {
  const history = createMemoryHistory();
  const fetchUnapprovedSightings = jest
    .spyOn(apiClient, "fetchUnapprovedSightings")
    .mockImplementation(async () => unapprovedSightingsDummyData);
  await act(async () => {
    render(
      <Router history={history}>
        <UnapprovedSightingPage />
      </Router>
    );
  });
  await waitFor(() => expect(fetchUnapprovedSightings).toBeCalled());
});

const context_admin_login = {
  isLoggedIn: true,
  isAdmin: true,
  username: "Olena",
  password: "password",
  logIn: async () => true,
  logOut: async () => true,
};

test("When rendered, check the correct number of unapproved sightings", async () => {
  jest
    .spyOn(apiClient, "fetchUnapprovedSightings")
    .mockImplementation(async () => unapprovedSightingsDummyData);
  render(
    <LoginContext.Provider value={context_admin_login}>
      <UnapprovedSightingPage />
    </LoginContext.Provider>
  );
  await waitFor(() => {
    expect(screen.queryAllByRole("unapproved")).toHaveLength(2);
    const element = screen.getByText(/A sighting, very amazing/i);
    expect(element).toBeInTheDocument();
  });
});

const context_admin_logout = {
  isLoggedIn: false,
  isAdmin: false,
  username: "Olena",
  password: "password",
  logIn: async () => true,
  logOut: async () => true,
};

test("When rendered, asks admin to login", async () => {
  jest.spyOn(apiClient, "fetchSightings").mockImplementation();

  render(
    <LoginContext.Provider value={context_admin_logout}>
      <UnapprovedSightingPage />
    </LoginContext.Provider>
  );
  const elements = screen.getAllByText(/Please login as administrator/i);
  expect(elements[0]).toBeInTheDocument();
});
