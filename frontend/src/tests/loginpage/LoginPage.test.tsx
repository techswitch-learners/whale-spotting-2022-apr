import { render, screen } from "@testing-library/react";
import { LoginPage } from "../../components/login/LoginPage";

test("input fields of the form can be found", () => {
  render(<LoginPage />);
  const elements1 = screen.getAllByPlaceholderText(/username/i);
  const elements2 = screen.getAllByPlaceholderText(/password/i);
  const element3 = screen.getByRole("button", { name: /log in/i });
  expect(elements1[0]).toBeInTheDocument();
  expect(elements2[0]).toBeInTheDocument();
  expect(element3).toBeInTheDocument();
});
