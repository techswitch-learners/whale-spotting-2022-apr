import { render, screen } from "@testing-library/react";
import { CreateSightingForm } from "../../components/createsighting/CreateSightingForm";

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
