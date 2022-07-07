import { act, fireEvent, render, screen } from "@testing-library/react";
import { CreateSightingForm } from "../../components/createsighting/CreateSightingForm";
import * as apiClient from "../../clients/internalApiClient";

test("Should render without error", () => {
  render(<CreateSightingForm />);
});

test("When rendered, all form elements are present", () => {
  render(<CreateSightingForm />);

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
  render(<CreateSightingForm />);

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
